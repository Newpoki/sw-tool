import { Control, useController } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { AddCouponFormValues } from "../coupons-types";
import { useCallback } from "react";

type CouponsAddFormCodeFieldProps = {
  control: Control<AddCouponFormValues>;
};

export const CouponsAddFormCodeField = ({
  control,
}: CouponsAddFormCodeFieldProps) => {
  const { field, fieldState } = useController({ control, name: "code" });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(event.target.value.toUpperCase());
    },
    [field],
  );

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} aria-required>
        Code
      </FieldLabel>

      <Input
        {...field}
        autoFocus
        id={field.name}
        onChange={handleChange}
        placeholder="Type the coupon code"
        autoComplete="off"
        aria-invalid={fieldState.invalid}
      />

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
