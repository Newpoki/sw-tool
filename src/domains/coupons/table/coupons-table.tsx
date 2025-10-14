"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "~/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { CouponsTableColumnsPicker } from "./coupons-table-columns-picker";
import { useLocalStorage } from "~/lib/use-local-storage";
import { couponsTableInitialColumnsVisibilitySchema } from "../coupons-types";
import { COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY } from "../coupons-constants";
import { Coupon } from "@prisma/client";
import { Link } from "@tanstack/react-router";

type CouponsTableProps = {
  columns: ColumnDef<Coupon>[];
  data: Coupon[];
  rowCount: number;
  paginationState: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
};

export function CouponsTable<Coupon, TValue>({
  columns,
  data,
  paginationState,
  rowCount,
  onPaginationChange,
}: CouponsTableProps) {
  const initialColumnsVisibilityLS = useLocalStorage(
    COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY,
    couponsTableInitialColumnsVisibilitySchema,
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount,
    manualPagination: true,
    initialState: {
      columnVisibility: initialColumnsVisibilityLS.get() ?? undefined,
    },
    state: {
      pagination: paginationState,
    },
    onPaginationChange,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <CouponsTableColumnsPicker table={table} />

        <Button asChild type="button">
          <Link
            to="/coupons/add"
            // Subroute is displayed as Outlet, we want to keep the scroll position
            resetScroll={false}
          >
            Add new coupon
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
