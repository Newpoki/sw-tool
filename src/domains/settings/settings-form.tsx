import { useForm } from "react-hook-form";
import { SettingsFormValues, settingsFormValuesSchema } from "./settings-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "~/lib/use-local-storage";
import { SETTINGS_LS_KEY } from "./settings-constants";
import { useCallback } from "react";
import { Field, FieldGroup } from "~/components/ui/field";
import { SettingsFormHiveIdField } from "./settings-form-hive-id-field";
import { SettingsFormServerField } from "./settings-form-server-field";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { SettingsFormLangField } from "./settings-form-lang-field";

export const SettingsForm = () => {
  const settingsLS = useLocalStorage(SETTINGS_LS_KEY, settingsFormValuesSchema);

  const settingsFromLS = settingsLS.get();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormValuesSchema),
    defaultValues: {
      hiveId: settingsFromLS?.hiveId ?? "",
      server: settingsFromLS?.server ?? "europe",
      lang: settingsFromLS?.lang ?? "fr",
    },
  });

  const handleSubmit = useCallback(
    (formValues: SettingsFormValues) => {
      toast("Settings have been updated");

      settingsLS.set(formValues);
    },
    [settingsLS],
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <SettingsFormHiveIdField control={form.control} />

        <SettingsFormServerField control={form.control} />

        <SettingsFormLangField control={form.control} />

        <Field className="md:ml-auto md:w-fit">
          <Button>Save</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
