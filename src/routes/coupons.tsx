import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { couponsQueryOptions } from "~/domains/coupons/coupons-api";
import { COUPONS_TABLE_COLUMNS } from "~/domains/coupons/coupons-columns";
import { COUPONS_TABLE_DEFAULT_PAGINATION_STATE } from "~/domains/coupons/coupons-constants";
import { CouponsTable } from "~/domains/coupons/coupons-table";

export const Route = createFileRoute("/coupons")({
  component: RouteComponent,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(
      couponsQueryOptions({
        pagination: COUPONS_TABLE_DEFAULT_PAGINATION_STATE,
      }),
    );
  },
});

function RouteComponent() {
  const [pagination, setPagination] = useState<PaginationState>(
    COUPONS_TABLE_DEFAULT_PAGINATION_STATE,
  );

  const { data } = useQuery(couponsQueryOptions({ pagination }));

  return (
    <div className="container flex flex-col gap-4">
      <Button className="ml-auto" asChild type="button">
        <Link
          to="/coupons/add"
          // Subroute is displayed as Outlet, we want to keep the scroll position
          resetScroll={false}
        >
          Add new coupon
        </Link>
      </Button>

      <CouponsTable
        data={data?.elements ?? []}
        rowCount={data?.count ?? 0}
        columns={COUPONS_TABLE_COLUMNS}
        paginationState={pagination}
        onPaginationChange={setPagination}
      />

      <Outlet />
    </div>
  );
}
