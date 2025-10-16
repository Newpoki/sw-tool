import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { SettingsFormValues } from "./settings-types";
import { Control, useController } from "react-hook-form";
import { LANGS_OPTIONS } from "../langs/langs-constants";

const OPTIONS = [LANGS_OPTIONS.FR] as const;

type SettingsFormLangFieldProps = {
  control: Control<SettingsFormValues>;
};

export const SettingsFormLangField = ({
  control,
}: SettingsFormLangFieldProps) => {
  const { field, fieldState } = useController({ control, name: "lang" });

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>Lang</FieldLabel>
      <Select
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
          <SelectValue placeholder="Select your lang" />
        </SelectTrigger>

        <SelectContent align="center">
          {OPTIONS.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
