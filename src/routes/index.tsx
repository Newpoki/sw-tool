import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => {
    throw redirect({ to: "/coupons" });
  },
});

function Home() {
  return null;
}
