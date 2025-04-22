import {
    Button, Input, Text, VStack, Flex
  } from '@chakra-ui/react'
  import { useForm } from 'react-hook-form'
  import { useMutation, useQueryClient } from '@tanstack/react-query'
  import { useTranslation } from 'react-i18next'
  import { useNavigate } from '@tanstack/react-router'
  
  import { Field } from '@/components/ui/field'
  import { ItemsService, type ItemCreate } from '@/client'
  import useCustomToast from '@/hooks/useCustomToast'
  import { handleError } from '@/utils'
  
  interface FormViewProps {
    defaultValues: ItemCreate
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
    } = useForm<ItemCreate>({
      mode: 'onBlur',
      defaultValues,
    })
  
    const mutation = useMutation({
      mutationFn: (data: ItemCreate) => {
        return isEditMode
          ? ItemsService.updateItem({ id: itemId!, requestBody: data })
          : ItemsService.createItem({ requestBody: data })
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
  
    const onSubmit = (data: ItemCreate) => {
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
            invalid={!!errors.title}
            errorText={errors.title?.message}
            label={t('items.bot_name')}
          >
            <Input
              {...register('title', {
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
            <Input
              {...register('description')}
              placeholder={t('items.bot_desc')}
            />
          </Field>
        </VStack>
  
        <Flex gap={4} py={6}>
          <Button variant="subtle" colorPalette="gray" isDisabled={isSubmitting}>
            {t('buttons.cancel')}
          </Button>
          <Button
            type="submit"
            variant="solid"
            isDisabled={!isValid}
            isLoading={isSubmitting}
          >
            {t('buttons.save')}
          </Button>
        </Flex>
      </form>
    )
  }
  