// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { Button } from "~/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~/components/ui/dialog";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "~/components/ui/drawer";
// import { useCallback, useState } from "react";
// import { CouponsAddForm } from "~/domains/coupons/add-form/coupons-add-form";
// import { useMediaQuery } from "usehooks-ts";

// export const Route = createFileRoute("/coupons/add")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   const navigate = Route.useNavigate();

//   const [isOpen, setIsOpen] = useState(true);

//   const isDesktop = useMediaQuery("(min-width: 768px)");

//   const handleRedirectToList = useCallback(
//     (open: boolean) => {
//       console.log({ open });
//       if (!open) {
//         navigate({ to: "/coupons" });
//       }
//     },
//     [navigate],
//   );

//   const handleCloseDrawer = useCallback((open: boolean) => {
//     if (!open) {
//       setIsOpen(false);
//     }
//   }, []);

//   const handleCloseDialog = useCallback(
//     (open: boolean) => {
//       if (!open) {
//         setIsOpen(false);

//         // Must add a little bit of delay to ensure the dialog animation is fully done
//         setTimeout(() => {
//           handleRedirectToList(false);
//         }, 300);
//       }
//     },
//     [handleRedirectToList],
//   );

//   if (isDesktop) {
//     return (
//       <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
//         <DialogTrigger asChild>
//           <Button variant="outline">Add new code</Button>
//         </DialogTrigger>

//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add new code</DialogTitle>
//             <DialogDescription>
//               Enter here new code so other players can use it !
//             </DialogDescription>
//           </DialogHeader>

//           <CouponsAddForm onSuccess={() => handleCloseDialog(false)} />
//         </DialogContent>
//       </Dialog>
//     );
//   }

//   return (
//     <Drawer
//       open={isOpen}
//       onOpenChange={handleCloseDialog}
//       //   onAnimationEnd={handleRedirectToList}
//     >
//       <DrawerTrigger asChild>
//         <Button variant="outline">Add new code</Button>
//       </DrawerTrigger>

//       <DrawerContent>
//         <DrawerHeader className="text-left">
//           <DrawerTitle>Add new code</DrawerTitle>
//           <DrawerDescription>
//             Enter here new code so other players can use it !
//           </DrawerDescription>
//         </DrawerHeader>

//         <div className="p-4">
//           <CouponsAddForm onSuccess={() => handleCloseDialog(false)} />
//         </div>

//         <DrawerFooter className="pt-2">
//           <DrawerClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// }

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "~/components/ui/drawer";
import { useCallback, useState } from "react";
import { CouponsAddForm } from "~/domains/coupons/add-form/coupons-add-form";
import { useMediaQuery } from "usehooks-ts";

export const Route = createFileRoute("/coupons/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCloseAndRedirect = useCallback(() => {
    setIsOpen(false);

    // Add a slight delay to wait for dialog/drawer animation
    setTimeout(() => {
      navigate({
        to: "/coupons",
        // Subroute is displayed as Outlet, we want to keep the scroll position
        resetScroll: false,
      });
    }, 300);
  }, [navigate]);

  if (isDesktop) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => !open && handleCloseAndRedirect()}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new code</DialogTitle>
            <DialogDescription>
              Enter here new code so other players can use it!
            </DialogDescription>
          </DialogHeader>

          <CouponsAddForm onSuccess={handleCloseAndRedirect} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && handleCloseAndRedirect()}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add new code</DrawerTitle>
          <DrawerDescription>
            Enter here new code so other players can use it!
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <CouponsAddForm onSuccess={handleCloseAndRedirect} />
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
