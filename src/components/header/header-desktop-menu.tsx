import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { HouseIcon } from "lucide-react";

export const HeaderDesktopMenu = () => {
  return (
    <div className="hidden items-center gap-1 pr-4 md:flex">
      <Button size="icon-sm" asChild variant="ghost" className="-ml-1">
        <Link to="/">
          <HouseIcon />
        </Link>
      </Button>

      <Button size="sm" asChild variant="ghost">
        <Link to="/">Home</Link>
      </Button>

      <Button size="sm" asChild variant="ghost">
        <Link to="/coupons">Coupons list</Link>
      </Button>

      <Button size="sm" asChild variant="ghost">
        <Link to="/settings">Settings</Link>
      </Button>
    </div>
  );
};
