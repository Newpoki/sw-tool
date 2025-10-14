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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCouponsMutationOptions,
  fetchPaginatedCouponsQueryOptions,
} from "../coupons-api";
import { CouponsAddFormExpiresAtField } from "./coupons-add-form-expires-at-field";
import { toast } from "sonner";
import { CouponsAddFormAutoUseField } from "./coupons-add-form-auto-use-field";
import { COUPONS_TABLE_DEFAULT_PAGINATION_STATE } from "../coupons-constants";

type CouponsAddFormProps = {
  onSuccess: () => void;
};

export const CouponsAddForm = ({ onSuccess }: CouponsAddFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<AddCouponFormValues>({
    resolver: zodResolver(addCouponFormValuesSchema),
    defaultValues: {
      autoUse: true,
      code: "",
      expiresAt: undefined,
    },
  });

  const { mutateAsync: addCouponMutation } = useMutation({
    ...addCouponsMutationOptions(),
    onSuccess: (coupon) => {
      toast.success("Coupon has been added.");

      queryClient.setQueryData(
        // Updating only the first page, because that's where the element would end up
        fetchPaginatedCouponsQueryOptions({
          pagination: COUPONS_TABLE_DEFAULT_PAGINATION_STATE,
        }).queryKey,
        (currentData) => {
          if (currentData == null) {
            return { count: 1, elements: [coupon] };
          }

          return {
            count: currentData.count + 1,
            elements: [coupon, ...currentData.elements],
          };
        },
      );

      onSuccess();
    },
  });

  const handleSubmit = useCallback(
    (formValues: AddCouponFormValues) => {
      return addCouponMutation(formValues);
    },
    [addCouponMutation],
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <CouponsAddFormAutoUseField control={form.control} />

        <CouponsAddFormCodeField control={form.control} />

        <CouponsAddFormExpiresAtField control={form.control} />

        <Field>
          <Button>Add</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
