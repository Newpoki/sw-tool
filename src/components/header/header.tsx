import { HeaderMobileMenu } from "./header-mobile-menu";
import { HEADER_HEIGHT } from "./header-constants";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SunMoonIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-background sticky top-0 z-50">
      <div
        className="container flex items-center justify-between py-2"
        style={{ height: HEADER_HEIGHT }}
      >
        <HeaderMobileMenu />

        <div className="flex h-5 items-center gap-2">
          <Button size="icon-sm" variant="ghost" asChild>
            <a
              href="https://github.com/Newpoki/sw-tool"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                className="size-4"
                src="https://unpkg.com/simple-icons@v15/icons/github.svg"
              />
            </a>
          </Button>

          <Separator orientation="vertical" />

          <Button size="icon-sm" variant="ghost" type="button">
            <SunMoonIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
