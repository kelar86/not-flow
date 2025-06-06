import { Link as RouterLink } from "@tanstack/react-router"
import { Button } from "@chakra-ui/react"
import { FaExchangeAlt } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { type ItemPublic } from "@/client"

interface EditItemProps {
  item: ItemPublic
}

const EditItem = ({ item }: EditItemProps) => {
  const { t } = useTranslation()

  return (
    <RouterLink to="/item/$itemId" params={{ itemId: item.id }} >
      <Button variant="ghost">
        <FaExchangeAlt fontSize="16px" />
        {t("buttons.edit")}
      </Button>
    </RouterLink>    
  )
}

export default EditItem
