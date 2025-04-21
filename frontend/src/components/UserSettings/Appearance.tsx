import { Container, Heading, Stack } from "@chakra-ui/react"
import { useTheme } from "next-themes"

import { Radio, RadioGroup } from "@/components/ui/radio"
import { useTranslation } from "react-i18next"

const Appearance = () => {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          {t("settings.appearance.subtitle")}
        </Heading>

        <RadioGroup
          onValueChange={(e) => setTheme(e.value)}
          value={theme}
          colorPalette="teal"
        >
          <Stack>
            <Radio value="system">{t("settings.appearance.system")}</Radio>
            <Radio value="light">{t("settings.appearance.light")}</Radio>
            <Radio value="dark">{t("settings.appearance.dark")}</Radio>
          </Stack>
        </RadioGroup>
      </Container>
    </>
  )
}
export default Appearance
