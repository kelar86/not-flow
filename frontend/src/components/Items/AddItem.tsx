import { Link as RouterLink } from "@tanstack/react-router"
import { Button } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"

const AddItem = () => {
  return (
    <RouterLink to="/new/$itemId">
      <Button value="add-item" my={4}>
        <FaPlus fontSize="16px" />
        Add Item
      </Button>
    </RouterLink>
  )
}

export default AddItem
