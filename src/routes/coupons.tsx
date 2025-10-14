import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { fetchPaginatedCouponsQueryOptions } from "~/domains/coupons/coupons-api";
import { COUPONS_TABLE_COLUMNS } from "~/domains/coupons/table/coupons-table-columns";
import { COUPONS_TABLE_DEFAULT_PAGINATION_STATE } from "~/domains/coupons/coupons-constants";
import { CouponsTable } from "~/domains/coupons/table/coupons-table";

export const Route = createFileRoute("/coupons")({
  component: RouteComponent,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(
      fetchPaginatedCouponsQueryOptions({
        pagination: COUPONS_TABLE_DEFAULT_PAGINATION_STATE,
      }),
    );
  },
});

function RouteComponent() {
  const [pagination, setPagination] = useState<PaginationState>(
    COUPONS_TABLE_DEFAULT_PAGINATION_STATE,
  );

  const { data } = useQuery(fetchPaginatedCouponsQueryOptions({ pagination }));

  return (
    <div className="container">
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
