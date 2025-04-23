import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Message, AgentsPublic, AgentPublic, AgentCreate, Agent

router = APIRouter(prefix="/agents", tags=["agents"])


@router.get("/", response_model=AgentsPublic)
def read_agents(session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100) -> Any:
    if current_user.is_superuser:
        count = session.exec(select(func.count()).select_from(Agent)).one()
        agents = session.exec(select(Agent).offset(skip).limit(limit)).all()
    else:
        count = session.exec(
            select(func.count()).select_from(Agent).where(Agent.owner_id == current_user.id)
        ).one()
        agents = session.exec(
            select(Agent).where(Agent.owner_id == current_user.id).offset(skip).limit(limit)
        ).all()

    return AgentsPublic(data=agents, count=count)


@router.get("/{id}", response_model=AgentPublic)
def read_agent(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    agent = session.get(Agent, id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    if not current_user.is_superuser and agent.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return agent


@router.post("/", response_model=AgentPublic)
def create_agent(session: SessionDep, current_user: CurrentUser, agent_in: AgentCreate) -> Any:
    agent = Agent.model_validate(agent_in, update={"owner_id": current_user.id})
    session.add(agent)
    try:
        session.commit()
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=400,
            detail="Agent name must be unique for the current user.",
        )
    session.refresh(agent)
    return agent


@router.put("/{id}", response_model=AgentPublic)
def update_agent(session: SessionDep, current_user: CurrentUser, id: uuid.UUID, agent_in: AgentCreate) -> Any:
    agent = session.get(Agent, id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    if not current_user.is_superuser and agent.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    update_dict = agent_in.model_dump(exclude_unset=True)

    for key, value in update_dict.items():
        setattr(agent, key, value)

    session.add(agent)
    try:
        session.commit()
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=400,
            detail="Agent name must be unique for the current user.",
        )
    session.refresh(agent)
    return agent


@router.delete("/{id}", response_model=Message)
def delete_agent(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    agent = session.get(Agent, id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    if not current_user.is_superuser and agent.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    session.delete(agent)
    session.commit()
    return Message(message="Agent deleted successfully")

