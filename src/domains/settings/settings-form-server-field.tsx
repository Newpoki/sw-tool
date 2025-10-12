import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { SERVERS_OPTIONS } from "../servers/servers-constants";
import { SettingsFormValues } from "./settings-types";
import { Control, useController } from "react-hook-form";

const OPTIONS = [
  SERVERS_OPTIONS.EUROPE,
  SERVERS_OPTIONS.ASIA,
  SERVERS_OPTIONS.CHINA,
  SERVERS_OPTIONS.GLOBAL,
  SERVERS_OPTIONS.KOREA,
  SERVERS_OPTIONS.JAPAN,
] as const;

type SettingsFormServerFieldProps = {
  control: Control<SettingsFormValues>;
};

export const SettingsFormServerField = ({
  control,
}: SettingsFormServerFieldProps) => {
  const { field, fieldState } = useController({ control, name: "server" });

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>Server</FieldLabel>
      <Select
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
          <SelectValue placeholder="Select your server" />
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
