import { ColumnDef } from "@tanstack/react-table";
import { Coupon } from "@prisma/client";
import { Skeleton } from "~/components/ui/skeleton";
import { CouponsTablecolumnsActionsCell } from "./coupons-table-columns-actions-cell";
import { CheckCircle2Icon } from "lucide-react";
import { useLocalStorage } from "~/lib/use-local-storage";
import { COUPONS_TABLE_USED_COUPONS_LS_KEY } from "../coupons-constants";
import { couponsTableUsedCouponsSchema } from "../coupons-types";

type UseGetCouponsTableColumnsParams = {
  isLoading: boolean;
};

export const useGetCouponsTableColumns = ({
  isLoading,
}: UseGetCouponsTableColumnsParams): ColumnDef<Coupon>[] => {
  const usedCouponsLS = useLocalStorage(
    COUPONS_TABLE_USED_COUPONS_LS_KEY,
    couponsTableUsedCouponsSchema,
  );

  return [
    {
      id: "used",
      enableHiding: false,
      cell: ({ row }) => {
        if (isLoading) {
          return <Skeleton className="my-2 size-4 rounded-full md:size-6" />;
        }

        const isAlreadyUsed = usedCouponsLS.get()?.[row.original.code] != null;

        if (!isAlreadyUsed) {
          // So there is no layout shifting
          // when a coupon is flagged as used where there is none yet
          return <div className="size-4 md:size-6" />;
        }

        return <CheckCircle2Icon className="size-4 md:size-6" />;
      },
    },
    {
      accessorKey: "code",
      header: "Coupon",
      enableHiding: false,
      cell: ({ row }) => {
        if (isLoading) {
          return <Skeleton className="my-2 h-4 w-40" />;
        }

        const { code } = row.original;

        return <span className="font-bold">{code}</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        if (isLoading) {
          return <Skeleton className="my-2 h-4 w-28" />;
        }

        const { createdAt } = row.original;

        return new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(createdAt);
      },
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: (context) => {
        return (
          <CouponsTablecolumnsActionsCell {...context} isLoading={isLoading} />
        );
      },
    },
  ];
};
