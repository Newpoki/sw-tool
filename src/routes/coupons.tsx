import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/coupons')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/coupons"!</div>
}
