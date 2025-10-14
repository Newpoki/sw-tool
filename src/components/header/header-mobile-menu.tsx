import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { HEADER_HEIGHT } from "./header-constants";
import { HeaderMobileMenuIconButton } from "./header-mobile-menu-icon-button";

export const HeaderMobileMenu = () => {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <HeaderMobileMenuIconButton />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full sm:max-w-none"
        style={{
          top: HEADER_HEIGHT,
          height: `calc(100dvh - ${HEADER_HEIGHT}px`,
        }}
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-3 pr-4">
          <SheetClose asChild>
            <Button asChild variant="link" className="w-full justify-start">
              <Link to="/">Home</Link>
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button asChild variant="link" className="w-full justify-start">
              <Link to="/coupons">Coupons list</Link>
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button asChild variant="link" className="w-full justify-start">
              <Link to="/settings">Settings</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
