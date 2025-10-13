import { CalendarIcon } from "lucide-react";
import { Control, useController } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { AddCouponFormValues } from "../coupons-types";
import { useMemo } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";

type CouponsAddFormExpiresAtFieldProps = {
  control: Control<AddCouponFormValues>;
};

const isDateDisabled = (date: Date) => date.getTime() < new Date().getTime();

export const CouponsAddFormExpiresAtField = ({
  control,
}: CouponsAddFormExpiresAtFieldProps) => {
  const { field, fieldState } = useController({ control, name: "expiresAt" });

  const formattedDate = useMemo(() => {
    if (field.value == null) return;

    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(field.value);
  }, [field.value]);

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Expires at</FieldLabel>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={field.value == null}
            data-invalid={fieldState.invalid}
            className="data-[empty=true]:text-muted-foreground data-[invalid=true]:border-destructive w-[280px] justify-start text-left font-normal"
          >
            <CalendarIcon />
            {formattedDate ?? <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={isDateDisabled}
          />
        </PopoverContent>
      </Popover>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
