import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/form')({
  component: () => <div>Hello /_layout/form!</div>
})