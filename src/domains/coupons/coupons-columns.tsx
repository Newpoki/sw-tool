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

export const COUPONS_TABLE_COLUMNS: ColumnDef<Coupon>[] = [
  {
    accessorKey: "code",
    header: "Coupon",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(createdAt);
    },
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
    cell: ({ row }) => {
      const { expiresAt } = row.original;

      if (expiresAt == null) {
        return "N/A";
      }

      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(expiresAt);
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { code } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
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
