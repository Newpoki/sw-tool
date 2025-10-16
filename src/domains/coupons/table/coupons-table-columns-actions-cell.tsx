import { Coupon } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Skeleton } from "~/components/ui/skeleton";
import { addCouponMutationOptions } from "../coupons-api";
import { useCallback } from "react";
import { AddCouponAPIPayload } from "../coupons-types";
import { useLocalStorage } from "~/lib/use-local-storage";
import { SETTINGS_LS_KEY } from "~/domains/settings/settings-constants";
import { settingsFormValuesSchema } from "~/domains/settings/settings-types";

type CouponsTablecolumnsActionsCellProps = CellContext<Coupon, void> & {
  isLoading: boolean;
};

export const CouponsTablecolumnsActionsCell = ({
  row,
  isLoading,
}: CouponsTablecolumnsActionsCellProps) => {
  const { code, isExpired } = row.original;
  const settingsLS = useLocalStorage(SETTINGS_LS_KEY, settingsFormValuesSchema);

  const queryClient = useQueryClient();

  const { mutate: redeemCoupon, isPending } = useMutation({
    ...addCouponMutationOptions(row.original),
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.code);

        // Refreshing because it should now be flagged as expired in the list
        if (response.code === "EXPIRED_COUPON") {
          queryClient.invalidateQueries({ queryKey: ["coupons"] });
        }

        return;
      }

      toast.success("Coupon has been redeemed.");
    },
    onError: () => {
      toast.error("UNKNOWN_ERROR");
    },
  });

  const isDisabled = isExpired || isPending;

  const handleCopyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(code);

    toast.success("The code has been copied to clipboard !");
  }, [code]);

  const handleRedeemCoupon = useCallback(() => {
    const settings = settingsLS.get();

    const payload: AddCouponAPIPayload = {
      country: "FR",
      lang: settings?.lang ?? "fr",
      server: settings?.server ?? "europe",
      coupon: code,
      hiveid: settings?.hiveId ?? "",
    };

    redeemCoupon(payload);
  }, [code, redeemCoupon, settingsLS]);

  if (isLoading) {
    return <Skeleton className="h-4 w-full" />;
  }

  return (
    <>
      <div className="hidden gap-4 md:flex">
        <Button
          variant="secondary"
          disabled={isDisabled}
          size="sm"
          onClick={handleCopyToClipboard}
          type="button"
        >
          Copy
        </Button>

        <Button
          disabled={isDisabled}
          size="sm"
          onClick={handleRedeemCoupon}
          type="button"
        >
          Redeem
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            disabled={isExpired}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem disabled={isDisabled} onClick={handleRedeemCoupon}>
            Redeem
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDisabled}
            onClick={handleCopyToClipboard}
          >
            Copy
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
