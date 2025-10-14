import { DropdownMenuCheckboxItem } from "~/components/ui/dropdown-menu";
import { useLocalStorage } from "~/lib/use-local-storage";
import { COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY } from "../coupons-constants";
import { couponsTableInitialColumnsVisibilitySchema } from "../coupons-types";
import { useCallback } from "react";
import { Column } from "@tanstack/react-table";
import { Coupon } from "@prisma/client";

type CouponsTableColumnsPickerItemProps = {
  column: Column<Coupon>;
};

export const CouponsTableColumnsPickerItem = ({
  column,
}: CouponsTableColumnsPickerItemProps) => {
  const initialColumnsVisibilityLS = useLocalStorage(
    COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY,
    couponsTableInitialColumnsVisibilitySchema,
  );

  const handleChangeColumnVisibility = useCallback(
    (value: boolean) => {
      column.toggleVisibility(!!value);

      initialColumnsVisibilityLS.set({
        ...initialColumnsVisibilityLS.get(),
        [column.id]: value,
      });
    },
    [column, initialColumnsVisibilityLS],
  );

  return (
    <DropdownMenuCheckboxItem
      className="capitalize"
      checked={column.getIsVisible()}
      onCheckedChange={handleChangeColumnVisibility}
    >
      {column.id}
    </DropdownMenuCheckboxItem>
  );
};
