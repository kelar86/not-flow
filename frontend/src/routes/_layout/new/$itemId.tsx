import { useEffect } from 'react'
import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import { Button, Input, Text, VStack, Flex } from "@chakra-ui/react"
import { Field } from "../../../components/ui/field"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ItemCreate, ItemsService } from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

export const Route = createFileRoute('/_layout/new/$itemId')({
  component: Form
})

function Form () {
    const navigate = useNavigate();
    const { itemId } = useParams({ strict: false })
    let itemData = null;
    // console.log('somewhereId =>> ', itemId);

    // to do развести логику добавления новог и редактирования существующего элемента
    // to do рефакторинг - проверка typeof itemId === 'number'
    // to do количество рендеров

    if (typeof itemId === 'number') {
      console.log('Запрашиваю данные')
      function getItem({ id }: { id: string }) {
        return {
          queryFn: () =>
            ItemsService.readItem({ id }),
            queryKey: ["item", { id }],
        }
      }
      const  { data } = useQuery({
        ...getItem({ id: itemId }),
      // placeholderData: (prevData) => prevData,
      });

      itemData = data;
    }

    const queryClient = useQueryClient()
    const { showSuccessToast } = useCustomToast()
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isValid, isSubmitting },
    } = useForm<ItemCreate>({
      mode: "onBlur",
      criteriaMode: "all",
      defaultValues: { title:  '', description:  '' }
    })

    useEffect(() => {
      // console.log('Сработал Use Effect itemId =>>.', itemId, 'data',  itemData);
      if (itemId) {
        reset({ title:  itemData?.title ?? '', description:  itemData?.description ?? '' })
      }
    }, [ itemData])
  
    const mutation = useMutation({
      mutationFn: (data: ItemCreate) => {
        if (typeof itemId === 'number') {
          ItemsService.updateItem({ id: itemId, requestBody: data })
        } else {
          ItemsService.createItem({ requestBody: data })
        }
      },
      onSuccess: () => {
        if (typeof itemId === 'number') {
          showSuccessToast("Item updated successfully.")
        } else {
          showSuccessToast("Item created successfully.")
        }
        reset()
        navigate({to: '/items'})
      },
      onError: (err: ApiError) => {
        handleError(err)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["items"] })
      },
    })
  
    const onSubmit: SubmitHandler<ItemCreate> = (data) => {
      mutation.mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text fontSize="lg" py={2} fontWeight="bold">
              Let's start to create you own bot!
          </Text>         
          <Text mb={4}>Fill in the details to add a new item.</Text>
          <VStack gap={4}>
              <Field
                required
                invalid={!!errors.title}
                errorText={errors.title?.message}
                label="Title"
              >
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required.",
                  })}
                  placeholder="Title"
                  type="text"
                />
              </Field>

              <Field
                invalid={!!errors.description}
                errorText={errors.description?.message}
                label="Description"
              >
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Description"
                  type="text"
                />
              </Field>
            </VStack>

            <Flex
              alignItems="start"
              gap={6}
              py={6}
            >
              <Button
                variant="subtle"
                colorPalette="gray"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
              variant="solid"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
              >
                Save
              </Button>
            </Flex>
      </form>
    )
}


