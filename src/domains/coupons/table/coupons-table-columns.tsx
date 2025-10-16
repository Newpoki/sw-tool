import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Coupon } from "@prisma/client";
import { Skeleton } from "~/components/ui/skeleton";

export const getCouponsTableColumns = (
  isLoading: boolean,
): ColumnDef<Coupon>[] => [
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
    cell: ({ row }) => {
      if (isLoading) {
        return <Skeleton className="h-4 w-full" />;
      }

      const { code, isExpired } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={isExpired}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>Redeem</DropdownMenuItem>

            <DropdownMenuItem
              onClick={async () => {
                await navigator.clipboard.writeText(code);

                toast.success("The code has been copied to clipboard !");
              }}
            >
              Copy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
