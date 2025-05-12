import { useParams } from '@tanstack/react-router'
import { FormSkeleton } from "./FormSkeleton"
import { useQuery } from '@tanstack/react-query'

import { AgentsService, type AgentCreate } from '@/client'
import { FormView } from './FormView'

export function Form() {
  const { itemId } = useParams({ strict: false })
  const isEditMode = !!itemId

  const { data: itemData, isLoading } = useQuery({
    queryKey: ['item', { id: itemId }],
    queryFn: () => AgentsService.readAgent({ id: itemId! }),
    enabled: isEditMode,
  })

  if (isEditMode && isLoading) {
    return <FormSkeleton />
  }

  const defaultValues: AgentCreate = itemData ?? { name: '', description: '', role: '', goal: '', backstory: '', instructions: '' }

  return (
    <FormView
      defaultValues={defaultValues}
      isEditMode={isEditMode}
      itemId={itemId}
    />
  )
}