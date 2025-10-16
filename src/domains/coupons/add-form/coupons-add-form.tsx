import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  AddCouponAPIPayload,
  AddCouponFormValues,
  addCouponFormValuesSchema,
} from "../coupons-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "~/components/ui/field";
import { Button } from "~/components/ui/button";
import { CouponsAddFormCodeField } from "./coupons-add-form-code-field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCouponMutationOptions,
  fetchPaginatedCouponsQueryOptions,
} from "../coupons-api";
import { toast } from "sonner";
import { COUPONS_TABLE_DEFAULT_PAGINATION_STATE } from "../coupons-constants";
import { useLocalStorage } from "~/lib/use-local-storage";
import { SETTINGS_LS_KEY } from "~/domains/settings/settings-constants";
import { settingsSchema } from "~/domains/settings/settings-types";
import { Coupon } from "@prisma/client";

type CouponsAddFormProps = {
  onSuccess: () => void;
};

export const CouponsAddForm = ({ onSuccess }: CouponsAddFormProps) => {
  const queryClient = useQueryClient();

  const settingsLS = useLocalStorage(SETTINGS_LS_KEY, settingsSchema);

  const form = useForm<AddCouponFormValues>({
    resolver: zodResolver(addCouponFormValuesSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutateAsync: addCouponMutation } = useMutation({
    ...addCouponMutationOptions(),
    onSuccess: (response) => {
      const updateQueryData = (coupon: Coupon) =>
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

      if (!response.success) {
        toast.error(response.code);

        // Code was already used, but since we didn't have it yet in the DB
        // We must refresh the list, so it's now displayed
        // Can't add it directly because we can't know on which page it would end up
        if (response.code === "ALREADY_USED_ADDED_LIST") {
          queryClient.invalidateQueries({ queryKey: ["coupons"] });
        }

        return;
      }

      toast.success("Coupon has been used.");

      updateQueryData(response.data);

      onSuccess();
    },
  });

  const handleSubmit = useCallback(
    async (formValues: AddCouponFormValues) => {
      const settings = settingsLS.get();

      const payload: AddCouponAPIPayload = {
        country: "FR",
        lang: "fr",
        server: "europe",
        coupon: formValues.code,
        hiveid: settings?.hiveId ?? "",
      };

      return addCouponMutation(payload);
    },
    [addCouponMutation, settingsLS],
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <CouponsAddFormCodeField control={form.control} />

        <Field>
          <Button loading={form.formState.isSubmitting}>Add</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
