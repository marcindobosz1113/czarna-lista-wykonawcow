import { createFileRoute } from '@tanstack/react-router'
import { Homepage } from '../layout/homepage/Homepage'

export const Route = createFileRoute('/')({
  component: Homepage,
})
