import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Field, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { addServerCoupon } from "~/utils/coupons";
import { useCallback } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const addCoupons = useServerFn(addServerCoupon);

  const { mutate: addCoupon } = useMutation({
    mutationKey: ["coupons", "add"],
    mutationFn: async () => {
      const response = await addCoupons();

      console.log({ response });
      return response;
    },
  });

  const handleAddCoupon = useCallback(() => {
    addCoupon();
  }, []);

  return (
    <div className="p-2">
      <Field>
        <FieldLabel htmlFor="coupon">
          <Input id="coupon" placeholder="coupon" autoComplete="off" />
        </FieldLabel>
      </Field>

      <Field>
        <Button type="button" onClick={handleAddCoupon}>
          Submit
        </Button>
      </Field>
    </div>
  );
}
