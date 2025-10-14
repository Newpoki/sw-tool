import { Control, useController } from "react-hook-form";
import { SettingsFormValues } from "./settings-types";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

type SettingsFormHiveIdFieldProps = {
  control: Control<SettingsFormValues>;
};

export const SettingsFormHiveIdField = ({
  control,
}: SettingsFormHiveIdFieldProps) => {
  const { field, fieldState } = useController({ control, name: "hiveId" });

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Hive ID</FieldLabel>
      <Input
        {...field}
        id={field.name}
        placeholder="Type your Hive ID"
        autoComplete="off"
        aria-invalid={fieldState.invalid}
      />

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
