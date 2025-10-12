import { Control, useController } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { AddCouponFormValues } from "../coupons-types";

type CouponsAddFormCodeFieldProps = {
  control: Control<AddCouponFormValues>;
};

export const CouponsAddFormCodeField = ({
  control,
}: CouponsAddFormCodeFieldProps) => {
  const { field, fieldState } = useController({ control, name: "code" });

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Code</FieldLabel>
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
