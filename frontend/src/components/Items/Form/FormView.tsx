import {
    Button, Input, Text, VStack, Flex, Textarea
  } from '@chakra-ui/react'
  import { useForm } from 'react-hook-form'
  import { Link as RouterLink } from "@tanstack/react-router"
  import { useMutation, useQueryClient } from '@tanstack/react-query'
  import { useTranslation } from 'react-i18next'
  import { useNavigate } from '@tanstack/react-router'
  
  import { Field } from '@/components/ui/field'
  import { AgentsService, type AgentCreate } from '@/client'
  import useCustomToast from '@/hooks/useCustomToast'
  import { handleError } from '@/utils'
  
  interface FormViewProps {
    defaultValues: AgentCreate
    isEditMode: boolean
    itemId?: string
  }
  
  export function FormView({ defaultValues, isEditMode, itemId }: FormViewProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { showSuccessToast } = useCustomToast()
  
    const {
      register,
      handleSubmit,
      formState: { errors, isValid, isSubmitting }
    } = useForm<AgentCreate>({
      mode: 'onBlur',
      defaultValues,
    })
  
    const mutation = useMutation({
      mutationFn: (data: AgentCreate) => {
        return isEditMode
          ? AgentsService.updateAgent({ id: itemId!, requestBody: data })
          : AgentsService.createAgent({ requestBody: data })
      },
      onSuccess: () => {
        showSuccessToast(
          isEditMode ? t('items.update_success') : t('items.create_success')
        )
        queryClient.invalidateQueries({ queryKey: ['items'] })
        navigate({ to: '/items' })
      },
      onError: handleError
    })
  
    const onSubmit = (data: AgentCreate) => {
      mutation.mutate(data)
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="lg" fontWeight="bold" py={2}>
          {isEditMode ? t('items.update') : t('items.create')}
        </Text>
        <Text mb={4}>
          {isEditMode ? t('items.update_desc') : t('items.create_desc')}
        </Text>
  
        <VStack gap={4}>
          <Field
            required
            invalid={!!errors.name}
            errorText={errors.name?.message}
            label={t('items.bot_name')}
          >
            <Input
              {...register('name', {
                required: t('items.required_name')
              })}
              placeholder={t('items.bot_name')}
            />
          </Field>
  
          <Field
            invalid={!!errors.description}
            errorText={errors.description?.message}
            label={t('items.bot_desc')}
          >
            <Textarea
              {...register('description')}
              placeholder={t('items.bot_desc')}
            />
          </Field>

          <Field
            required
            invalid={!!errors.role}
            errorText={errors.role?.message}
            label={t('items.bot_role')}
          >
            <Textarea
              {...register('role', {
                required: t('items.required')
              })}
              placeholder={t('items.bot_role')}
            />
          </Field>

          <Field
            required
            invalid={!!errors.goal}
            errorText={errors.goal?.message}
            label={t('items.bot_goal')}
          >
            <Textarea
              {...register('goal', {
                required: t('items.required')
              })}
              placeholder={t('items.bot_goal')}
            />
          </Field>

          <Field
            required
            invalid={!!errors.backstory}
            errorText={errors.backstory?.message}
            label={t('items.bot_backstory')}
          >
            <Textarea
              {...register('backstory', {
                required: t('items.required')
              })}
              placeholder={t('items.bot_backstory')}
            />
          </Field>

          <Field
            required
            invalid={!!errors.instructions}
            errorText={errors.instructions?.message}
            label={t('items.bot_instructions')}
          >
            <Textarea
              {...register('instructions', {
                required: t('items.required')
              })}
              placeholder={t('items.bot_instructions')}
            />
          </Field>
        </VStack>
  
        <Flex gap={4} py={6}>
          <RouterLink to="/items" >
            <Button variant="subtle" colorPalette="gray" disabled={isSubmitting}>
                {t('buttons.cancel')}
            </Button>
          </RouterLink>  
          <Button
            type="submit"
            variant="solid"
            disabled={!isValid}
            loading={isSubmitting}
          >
            {t('buttons.save')}
          </Button>
        </Flex>
      </form>
    )
  }
  