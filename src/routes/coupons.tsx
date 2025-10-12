import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { COUPONS_TABLE_COLUMNS } from "~/domains/coupons/coupons-columns";
import { CouponsTable } from "~/domains/coupons/coupons-table";
import { Coupon } from "~/domains/coupons/coupons-types";

export const Route = createFileRoute("/coupons")({
  component: RouteComponent,
});

function RouteComponent() {
  const data: Coupon[] = [
    { code: "123456", expirationDate: "12-23-1996" },
    { code: "UWUJASONUWU", expirationDate: "12-23-1996" },
  ];

  return (
    <div className="container flex flex-col gap-4">
      <Button className="ml-auto" asChild>
        <Link to="/coupons/add">Add new coupon</Link>
      </Button>

      <CouponsTable data={data} columns={COUPONS_TABLE_COLUMNS} />

      <Outlet />
    </div>
  );
}
