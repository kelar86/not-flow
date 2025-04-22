import { Container, Image, Input, Text } from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiLock, FiMail } from "react-icons/fi"

import type { Body_login_login_access_token as AccessToken } from "@/client"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { InputGroup } from "@/components/ui/input-group"
import { PasswordInput } from "@/components/ui/password-input"
import useAuth, { isLoggedIn } from "@/hooks/useAuth"
import Logo from "/assets/images/fastapi-logo.svg"
import { emailPattern, passwordRules } from "../utils"
import { useTranslation } from "react-i18next"

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function Login() {
  const { t } = useTranslation()
  const { loginMutation, error, resetError } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    if (isSubmitting) return

    resetError()

    try {
      await loginMutation.mutateAsync(data)
    } catch {
      // error is handled by useAuth hook
    }
  }

  return (
    <>
      <Container
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        h="100vh"
        maxW="sm"
        alignItems="stretch"
        justifyContent="center"
        gap={4}
        centerContent
      >
        <Image
          src={Logo}
          alt="FastAPI logo"
          height="auto"
          maxW="2xs"
          alignSelf="center"
          mb={4}
        />
        <Field
          invalid={!!errors.username}
          errorText={errors.username?.message || !!error}
        >
          <InputGroup w="100%" startElement={<FiMail />}>
            <Input
              id="username"
              {...register("username", {
                required: `${t("login.required_mail")}`,
                pattern: emailPattern,
              })}
              placeholder={t("login.mail")}
              type="email"
            />
          </InputGroup>
        </Field>
        <PasswordInput
          type="password"
          startElement={<FiLock />}
          {...register("password", passwordRules())}
          placeholder={t("login.password")}
          errors={errors}
        />
        <RouterLink to="/recover-password" className="main-link">
          {t("login.forgot")}
        </RouterLink>
        <Button variant="solid" type="submit" loading={isSubmitting} size="md">
          {t("login.log_in")}
        </Button>
        <Text>
          {t("login.dont_have_acc")}{" "}
          <RouterLink to="/signup" className="main-link">
            {t("login.sign_up")}
          </RouterLink>
        </Text>
      </Container>
    </>
  )
}
