import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  AddCouponFormValues,
  addCouponFormValuesSchema,
} from "../coupons-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "~/components/ui/field";
import { Button } from "~/components/ui/button";
import { CouponsAddFormCodeField } from "./coupons-add-form-code-field";
import { Link } from "@tanstack/react-router";

export const CouponsAddForm = () => {
  const form = useForm<AddCouponFormValues>({
    resolver: zodResolver(addCouponFormValuesSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = useCallback((formValues: AddCouponFormValues) => {
    console.log("submit");
  }, []);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <CouponsAddFormCodeField control={form.control} />

        <Field>
          <Button>Add</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
