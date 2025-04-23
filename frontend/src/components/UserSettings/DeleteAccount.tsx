import { Container, Heading, Text } from "@chakra-ui/react"
import DeleteConfirmation from "./DeleteConfirmation"
import { useTranslation } from "react-i18next"

const DeleteAccount = () => {
  const { t } = useTranslation()

  return (
    <Container maxW="full">
      <Heading size="sm" py={4}>
        {t("settings.danger.delete_acc")}
      </Heading>
      <Text>
        {t("settings.danger.warning")}
      </Text>
      <DeleteConfirmation />
    </Container>
  )
}
export default DeleteAccount
