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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCouponsMutationOptions, couponsQueryOptions } from "../coupons-api";
import { CouponsAddFormExpiresAtField } from "./coupons-add-form-expires-at-field";
import { toast } from "sonner";

export const CouponsAddForm = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: addCouponMutation } = useMutation({
    ...addCouponsMutationOptions(),
    onSuccess: (coupon) => {
      toast.success("Coupon has been added.");

      queryClient.setQueryData(
        couponsQueryOptions().queryKey,
        (currentCoupons) => {
          if (currentCoupons == null) {
            return [coupon];
          }

          return [coupon, ...currentCoupons];
        },
      );
    },
  });

  const form = useForm<AddCouponFormValues>({
    resolver: zodResolver(addCouponFormValuesSchema),
    defaultValues: {
      code: "",
      expiresAt: undefined,
    },
  });

  const handleSubmit = useCallback((formValues: AddCouponFormValues) => {
    return addCouponMutation(formValues);
  }, []);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <CouponsAddFormCodeField control={form.control} />

        <CouponsAddFormExpiresAtField control={form.control} />

        <Field>
          <Button>Add</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
