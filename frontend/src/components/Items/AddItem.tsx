import { Link as RouterLink } from "@tanstack/react-router"
import { Button } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import { useTranslation } from "react-i18next"


const AddItem = () => {
  const { t } = useTranslation();

  return (
    <RouterLink to="/item/new">
      <Button value="add-item" my={4}>
        <FaPlus fontSize="16px" />
        {t("items.add_item")}
      </Button>
    </RouterLink>
  )
}

export default AddItem
