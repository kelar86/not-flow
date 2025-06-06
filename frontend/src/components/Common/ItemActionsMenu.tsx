import { IconButton } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu"

import type { AgentsPublic } from "@/client"
import DeleteItem from "../Items/DeleteItem"
import EditItem from "../Items/EditItem"

interface AgentActionsMenuProps {
  item: AgentsPublic,
  pageInfo: {itemsLenght: number, pageNum: number }
}

export const ItemActionsMenu = ({ item, pageInfo }: AgentActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <EditItem item={item} />
        <DeleteItem id={item.id} pageInfo={pageInfo} />
      </MenuContent>
    </MenuRoot>
  )
}
