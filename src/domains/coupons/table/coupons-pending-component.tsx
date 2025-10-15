import { Button } from "~/components/ui/button";
import { getCouponsTableColumns } from "./coupons-table-columns";
import { CouponsTable } from "./coupons-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { COUPONS_TABLE_DEFAULT_PAGINATION_STATE } from "../coupons-constants";

const columns = getCouponsTableColumns(true);

export const CouponsPendingComponent = () => {
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
    <div className="flex flex-col gap-4">
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
