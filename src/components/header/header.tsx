import { HeaderMobileMenu } from "./header-mobile-menu";
import { HEADER_HEIGHT } from "./header-constants";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SunMoonIcon } from "lucide-react";
import { useTheme } from "~/domains/theme/theme-provider";
import { THEME } from "~/domains/theme/theme";
import { useCallback } from "react";
import { siGithub } from "simple-icons";
import { HeaderDesktopMenu } from "./header-desktop-menu";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = useCallback(() => {
    theme === THEME.LIGHT ? setTheme(THEME.DARK) : setTheme(THEME.LIGHT);
  }, [setTheme, theme]);

  return (
    <div className="bg-background sticky top-0 z-50">
      <div
        className="layout mx-auto flex items-center justify-between py-2"
        style={{ height: HEADER_HEIGHT }}
      >
        <HeaderMobileMenu />

        <HeaderDesktopMenu />

        <div className="flex h-5 items-center gap-2">
          <Button size="icon-sm" variant="ghost" asChild>
            <a
              href="https://github.com/Newpoki/sw-tool"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                role="img"
                className="fill-current"
                dangerouslySetInnerHTML={{ __html: siGithub.svg }}
              />
            </a>
          </Button>

          <Separator orientation="vertical" />

          <Button
            size="icon-sm"
            variant="ghost"
            type="button"
            onClick={handleToggleTheme}
          >
            <SunMoonIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
