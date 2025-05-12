import { Button, DialogTitle, Text } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { FiTrash2 } from "react-icons/fi"

import { AgentsService } from "@/client"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog"
import useCustomToast from "@/hooks/useCustomToast"
import { useTranslation } from "react-i18next"
import { useNavigate } from '@tanstack/react-router'

const DeleteItem = ({ id, pageInfo }: { id: string, pageInfo: {itemsLenght: number, pageNum } }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const deleteItem = async (id: string) => {
    await  AgentsService.deleteAgent({ id: id })
  }

  const mutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      showSuccessToast(`${t("items.delete_success")}`)
    },
    onError: () => {
      showErrorToast(`${t("items.delete_error")}`)
    },
    onSettled: () => {
      if (pageInfo.itemsLenght > 1 || pageInfo.pageNum === 1 ) {
        queryClient.invalidateQueries()        
      } else {
        navigate({ search: (prev: {page?: number}) => ({ ...prev, page: pageInfo.pageNum - 1 }) })
      }
    },
  })

  const onSubmit = async () => {
    mutation.mutate(id)
  }

  return (
    <DialogRoot
      size={{ base: "xs", md: "md" }}
      placement="center"
      role="alertdialog"
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" colorPalette="red">
          <FiTrash2 fontSize="16px" />
          {t("buttons.delete")}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>{t("buttons.delete")}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>
              {t("items.delete_warning")}
            </Text>
          </DialogBody>

          <DialogFooter gap={2}>
            <DialogActionTrigger asChild>
              <Button
                variant="subtle"
                colorPalette="gray"
                disabled={isSubmitting}
              >
                {t("buttons.cancel")}
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button
                variant="solid"
                colorPalette="red"
                type="submit"
                loading={isSubmitting}
              >
                {t("buttons.delete")}
              </Button>
            </DialogActionTrigger>
           
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  )
}

export default DeleteItem
