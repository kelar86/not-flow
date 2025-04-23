import { createFileRoute } from '@tanstack/react-router'
import { Form } from '../../../components/Items/Form/Form'

export const Route = createFileRoute('/_layout/item/$itemId')({
  component: () => <Form />
})