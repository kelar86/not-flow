import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link as RouterLink } from "@tanstack/react-router"
import { FiBriefcase, FiHome, FiSettings, FiUsers } from "react-icons/fi"
import type { IconType } from "react-icons/lib"
import type { UserPublic } from "@/client"
import { useTranslation } from "react-i18next"
import type { TFunction } from 'i18next'

const getItems = (t: TFunction) => {
  const items = [
    { icon: FiHome, title: `${t("menu.dashboard")}`, path: "/" },
    { icon: FiBriefcase, title: `${t("menu.items")}`, path: "/items" },
    { icon: FiSettings, title: `${t("menu.settings")}`, path: "/settings" },
  ]

  return items;
}

interface SidebarItemsProps {
  onClose?: () => void
}

interface Item {
  icon: IconType
  title: string
  path: string
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const translateItems = getItems(t);

  const finalItems: Item[] = currentUser?.is_superuser
    ? [...translateItems, { icon: FiUsers, title: "Admin", path: "/admin" }]
    : translateItems

  const listItems = finalItems.map(({ icon, title, path }) => (
    <RouterLink key={title} to={path} onClick={onClose}>
      <Flex
        gap={4}
        px={4}
        py={2}
        _hover={{
          background: "gray.subtle",
        }}
        alignItems="center"
        fontSize="sm"
      >
        <Icon as={icon} alignSelf="center" />
        <Text ml={2}>{title}</Text>
      </Flex>
    </RouterLink>
  ))

  return (
    <>
      <Text fontSize="xs" px={4} py={2} fontWeight="bold">
        {t("menu.title")}
      </Text>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems
