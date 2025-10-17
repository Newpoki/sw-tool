import { createFileRoute } from "@tanstack/react-router";
import { SettingsForm } from "~/domains/settings/settings-form";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
  ssr: false, // We don't need SSR features, and in our case, it cause some troubles
});

function RouteComponent() {
  return (
    <div className="mx-auto md:w-[500px]">
      <SettingsForm />
    </div>
  );
}
