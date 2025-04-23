import { Container, Heading, Tabs } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import Appearance from "@/components/UserSettings/Appearance"
import ChangePassword from "@/components/UserSettings/ChangePassword"
import DeleteAccount from "@/components/UserSettings/DeleteAccount"
import UserInformation from "@/components/UserSettings/UserInformation"
import useAuth from "@/hooks/useAuth"
import { useTranslation } from "react-i18next"
import type { TFunction } from 'i18next'

const getTabsConfig = (t: TFunction ) => {
  const tabsConfig = [
    { value: "my-profile", title: `${t("settings.profile.subtitle")}`, component: UserInformation },
    { value: "password", title: `${t("settings.password.subtitle")}`, component: ChangePassword },
    { value: "appearance", title: `${t("settings.appearance.subtitle")}`, component: Appearance },
    { value: "danger-zone", title: `${t("settings.danger.subtitle")}`, component: DeleteAccount },
  ]
  return tabsConfig
}

export const Route = createFileRoute("/_layout/settings")({
  component: UserSettings,
})

function UserSettings() {
  const { t } = useTranslation()
  const { user: currentUser } = useAuth()
  const tabsConfig = getTabsConfig(t)
  const finalTabs = currentUser?.is_superuser
    ? tabsConfig.slice(0, 3)
    : tabsConfig

  if (!currentUser) {
    return null
  }

  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={12}>
       {t("settings.title")}
      </Heading>

      <Tabs.Root defaultValue="my-profile" variant="subtle">
        <Tabs.List>
          {finalTabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value}>
              {tab.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {finalTabs.map((tab) => (
          <Tabs.Content key={tab.value} value={tab.value}>
            <tab.component />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Container>
  )
}
