import { Table } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { CouponsTableColumnsPickerItem } from "./coupons-table-columns-picker-item";
import { Coupon } from "@prisma/client";

type CouponsTableColumnsPickerProps = {
  table: Table<Coupon>;
};

export const CouponsTableColumnsPicker = ({
  table,
}: CouponsTableColumnsPickerProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Columns</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <CouponsTableColumnsPickerItem key={column.id} column={column} />
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
