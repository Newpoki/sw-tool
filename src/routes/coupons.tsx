import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { couponsQueryOptions } from "~/domains/coupons/coupons-api";
import { COUPONS_TABLE_COLUMNS } from "~/domains/coupons/coupons-columns";
import { CouponsTable } from "~/domains/coupons/coupons-table";

export const Route = createFileRoute("/coupons")({
  component: RouteComponent,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(couponsQueryOptions());
  },
});

function RouteComponent() {
  const { data: coupons } = useSuspenseQuery(couponsQueryOptions());

  return (
    <div className="container flex flex-col gap-4">
      <Button className="ml-auto" asChild>
        <Link to="/coupons/add">Add new coupon</Link>
      </Button>

      <CouponsTable data={coupons} columns={COUPONS_TABLE_COLUMNS} />

      <Outlet />
    </div>
  );
}
