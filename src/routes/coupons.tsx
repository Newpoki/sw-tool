import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { fetchPaginatedCouponsQueryOptions } from "~/domains/coupons/coupons-api";
import { getCouponsTableColumns } from "~/domains/coupons/table/coupons-table-columns";
import {
  COUPONS_TABLE_DEFAULT_PAGINATION_STATE,
  COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY,
} from "~/domains/coupons/coupons-constants";
import { CouponsTable } from "~/domains/coupons/table/coupons-table";
import { CouponsTableColumnsPicker } from "~/domains/coupons/table/coupons-table-columns-picker";
import { Button } from "~/components/ui/button";
import { useLocalStorage } from "~/lib/use-local-storage";
import { couponsTableInitialColumnsVisibilitySchema } from "~/domains/coupons/coupons-types";
import { CouponsPendingComponent } from "~/domains/coupons/table/coupons-pending-component";

export const Route = createFileRoute("/coupons")({
  ssr: false, // We don't need SSR features, and in our case, it cause some troubles
  component: RouteComponent,
  pendingComponent: CouponsPendingComponent,
});

function RouteComponent() {
  const [pagination, setPagination] = useState<PaginationState>(
    COUPONS_TABLE_DEFAULT_PAGINATION_STATE,
  );

  const { data, isLoading } = useQuery(
    fetchPaginatedCouponsQueryOptions({ pagination }),
  );

  const initialColumnsVisibilityLS = useLocalStorage(
    COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY,
    couponsTableInitialColumnsVisibilitySchema,
  );

  const cols = getCouponsTableColumns(isLoading);

  const table = useReactTable({
    data: isLoading
      ? Array(COUPONS_TABLE_DEFAULT_PAGINATION_STATE.pageSize).fill({})
      : (data?.elements ?? []),

    getCoreRowModel: getCoreRowModel(),
    rowCount: data?.count ?? 0,
    columns: cols,
    manualPagination: true,
    initialState: {
      columnVisibility: initialColumnsVisibilityLS.get() ?? undefined,
    },
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <CouponsTableColumnsPicker table={table} />

          <Button asChild type="button" disabled={isLoading}>
            <Link
              to="/coupons/add"
              // Subroute is displayed as Outlet, we want to keep the scroll position
              resetScroll={false}
            >
              Add new coupon
            </Link>
          </Button>
        </div>

        <CouponsTable table={table} />
      </div>

      <Outlet />
    </div>
  );
}
