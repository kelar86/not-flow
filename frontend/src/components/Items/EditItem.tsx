import { Link as RouterLink } from "@tanstack/react-router"
import { Button } from "@chakra-ui/react"
import { FaExchangeAlt } from "react-icons/fa"
import { useTranslation } from "react-i18next"

const EditItem = ({ item }: EditItemProps) => {
  const { t } = useTranslation()

  return (
    <RouterLink to="/new/$itemId" params={{ itemId: item.id }} >
      <Button variant="ghost">
        <FaExchangeAlt fontSize="16px" />
        {t("buttons.edit")}
      </Button>
    </RouterLink>    
  )
}

export default EditItem
