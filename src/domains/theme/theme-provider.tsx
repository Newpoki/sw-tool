import { useRouter } from "@tanstack/react-router";
import { createContext, use } from "react";
import { setThemeServerFn, type Theme } from "./theme";

type ThemeContextData = {
  theme: Theme;
  setTheme: (val: Theme) => void;
};

type ThemeContextProps = {
  children: React.ReactNode;
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextData | null>(null);

export function ThemeProvider({ children, theme }: ThemeContextProps) {
  const router = useRouter();

  function setTheme(val: Theme) {
    setThemeServerFn({ data: val }).then(() => router.invalidate());
  }

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const theme = use(ThemeContext);

  if (theme == null)
    throw new Error("useTheme called outside of ThemeProvider!");

  return theme;
}
