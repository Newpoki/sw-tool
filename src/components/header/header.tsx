import { Link } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export const Header = () => {
  return (
    <div className="bg-background">
      <div className="container flex items-center justify-between py-2">
        <MenuIcon />

        <div>
          <Button size="sm" asChild variant="ghost">
            <Link to="/coupons">Coupons list</Link>
          </Button>

          <Button size="sm" asChild variant="ghost">
            <Link to="/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
