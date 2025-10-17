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

export const HeaderMobileMenu = () => {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="group relative -ml-2.5 flex-row items-center gap-2 md:hidden"
          type="button"
        >
          <div className="flex w-4">
            <span className="bg-foreground absolute top-3 h-0.5 w-4 transition-transform group-data-[state=open]:top-4 group-data-[state=open]:-rotate-45" />
            <span className="bg-foreground absolute top-4.5 h-0.5 w-4 transition-transform group-data-[state=open]:top-4 group-data-[state=open]:rotate-45" />
          </div>

          <span>Menu</span>
        </Button>
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
            <Button
              asChild
              variant="link"
              className="w-full justify-start text-2xl"
            >
              <Link to="/coupons">Coupons list</Link>
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button
              asChild
              variant="link"
              className="w-full justify-start text-2xl"
            >
              <Link to="/settings">Settings</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
