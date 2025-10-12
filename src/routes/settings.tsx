import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { SettingsForm } from "~/domains/settings/settings-form";
import { addServerCoupon } from "~/utils/coupons";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  //   const addCoupons = useServerFn(addServerCoupon);
  //   const { mutate: addCoupon } = useMutation({
  //     mutationKey: ["coupons", "add"],
  //     mutationFn: async () => {
  //       const response = await addCoupons();
  //       console.log({ response });
  //       return response;
  //     },
  //   });
  //   const handleAddCoupon = useCallback(() => {
  //     addCoupon();
  //   }, []);
  //   return (
  //     <div className="p-2">
  //       <Field>
  //         <FieldLabel htmlFor="coupon">
  //           <Input id="coupon" placeholder="coupon" autoComplete="off" />
  //         </FieldLabel>
  //       </Field>
  //       <Field>
  //         <Button type="button" onClick={handleAddCoupon}>
  //           Submit
  //         </Button>
  //       </Field>
  //     </div>
  //   );
  return (
    <div className="container">
      <SettingsForm />
    </div>
  );
}
