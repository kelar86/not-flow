from crewai import Crew, Agent, Task, Process, LLM

import json
import sqlite3  # or SQLAlchemy if preferred


async def load_crew_from_db(crew_id: int):
    # conn = sqlite3.connect("your.db")
    # cursor = conn.cursor()
    #
    # # 1. Fetch agents
    # cursor.execute("SELECT id, name, role, goal, backstory, tools_json FROM agents WHERE crew_id=?", (crew_id,))
    # agents_data = cursor.fetchall()
    #
    # agents = {}
    # for row in agents_data:
    #     agent_id, name, role, goal, backstory, tools_json = row
    #     tools = json.loads(tools_json) if tools_json else []
    #     agents[agent_id] = Agent(name=name, role=role, goal=goal, backstory=backstory, tools=tools)
    #
    # # 2. Fetch tasks
    # cursor.execute("SELECT description, agent_ids FROM tasks WHERE crew_id=?", (crew_id,))
    # tasks_data = cursor.fetchall()
    #
    # tasks = []
    # for description, agent_ids_json in tasks_data:
    #     agent_ids = json.loads(agent_ids_json) if agent_ids_json else []
    #     for agent_id in agent_ids:
    #         if agent_id in agents:
    #             tasks.append(Task(description=description, agent=agents[agent_id]))

    # TODO: THIS IS TEMPORARY MOCK OF DYNAMIC GENERATING CREW
    llm = LLM(
        model='ollama/llama3',
        base_url='http://localhost:11434',
        stream=True
    )

    agent = Agent(
        role="Answer Bot",
        goal="Answer the user's question directly.",
        backstory="You're a helpful assistant that gives clear and accurate answers.",
        llm=llm,
        # chat_llm=llm,
        verbose=True,
        allow_delegation=False,
    )

    task = Task(
        description="Answer the user's question directly and concisely: {user_input}",
        expected_output="A short, factual answer with no reasoning or thoughts.",
        agent=agent,
        # output_json=True
    )

    # 3. Compile crew and run

    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True,
        process=Process.sequential,
        # memory=memory,
        share_crew=False,
        # planning=True
    )

    # crew = Crew(agents=list(agents.values()), tasks=tasks, verbose=True)
    return crew

# Run it
# crew = load_crew_from_db(crew_id=1)
# crew.kickoff()
