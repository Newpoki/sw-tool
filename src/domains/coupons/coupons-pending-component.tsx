import { Button } from "~/components/ui/button";
import { useGetCouponsTableColumns } from "./table/coupons-table-columns";
import { CouponsTable } from "./table/coupons-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { COUPONS_TABLE_DEFAULT_PAGINATION_STATE } from "./coupons-constants";

export const CouponsPendingComponent = () => {
  const columns = useGetCouponsTableColumns({ isLoading: true });

  const table = useReactTable({
    data: Array(COUPONS_TABLE_DEFAULT_PAGINATION_STATE.pageSize).fill({}),
    getCoreRowModel: getCoreRowModel(),
    rowCount: COUPONS_TABLE_DEFAULT_PAGINATION_STATE.pageSize,
    columns,
    manualPagination: true,
    state: {
      pagination: COUPONS_TABLE_DEFAULT_PAGINATION_STATE,
    },
  });

  return (
    <div className="flex flex-col gap-4 md:gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Button variant="outline" disabled>
            Columns
          </Button>

          <Button disabled>Add new coupon</Button>
        </div>
      </div>

      <CouponsTable table={table} />
    </div>
  );
};
