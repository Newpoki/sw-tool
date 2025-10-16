import { ColumnDef } from "@tanstack/react-table";
import { Coupon } from "@prisma/client";
import { Skeleton } from "~/components/ui/skeleton";
import { CouponsTablecolumnsActionsCell } from "./coupons-table-columns-actions-cell";

type UseGetCouponsTableColumnsParams = {
  isLoading: boolean;
};

export const useGetCouponsTableColumns = ({
  isLoading,
}: UseGetCouponsTableColumnsParams): ColumnDef<Coupon>[] => {
  return [
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
