import { Control, useController } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "~/components/ui/field";
import { AddCouponFormValues } from "../coupons-types";
import { Switch } from "~/components/ui/switch";

type CouponsAddFormAutoUseFieldProps = {
  control: Control<AddCouponFormValues>;
};

export const CouponsAddFormAutoUseField = ({
  control,
}: CouponsAddFormAutoUseFieldProps) => {
  const { field, fieldState } = useController({ control, name: "autoUse" });

  return (
    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor={field.name}>Auto use</FieldLabel>

        <FieldDescription>
          Automatically use the coupon while adding it
        </FieldDescription>

        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>

      <Switch
        id={field.name}
        name={field.name}
        checked={field.value}
        onCheckedChange={field.onChange}
        aria-invalid={fieldState.invalid}
      />
    </Field>
  );
};
