import { createFileRoute } from "@tanstack/react-router";
import { SettingsForm } from "~/domains/settings/settings-form";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto md:w-[350px]">
      <SettingsForm />
    </div>
  );
}
