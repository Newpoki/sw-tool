import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useCallback, useState } from "react";
import { CouponsAddForm } from "~/domains/coupons/add-form/coupons-add-form";
import { useMediaQuery } from "usehooks-ts";

export const Route = createFileRoute("/coupons/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = Route.useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleRedirectToList = useCallback(() => {
    navigate({ to: "/coupons" });
  }, []);

  const handleCloseDrawer = useCallback((open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  }, []);

  const handleCloseDialog = useCallback((open: boolean) => {
    if (!open) {
      setIsOpen(false);

      // Must add a little bit of delay to ensure the dialog animation is fully done
      setTimeout(() => {
        handleRedirectToList();
      }, 300);
    }
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogTrigger asChild>
          <Button variant="outline">Add new code</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new code</DialogTitle>
            <DialogDescription>
              Enter here new code so other players can use it !
            </DialogDescription>
          </DialogHeader>

          <CouponsAddForm onSuccess={() => handleCloseDialog(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={handleCloseDrawer}
      onAnimationEnd={handleRedirectToList}
    >
      <DrawerTrigger asChild>
        <Button variant="outline">Add new code</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add new code</DrawerTitle>
          <DrawerDescription>
            Enter here new code so other players can use it !
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <CouponsAddForm onSuccess={() => handleCloseDrawer(false)} />
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
