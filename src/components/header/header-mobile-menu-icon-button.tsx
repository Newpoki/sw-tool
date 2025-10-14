import { Button } from "../ui/button";

type HeaderMobileMenuIconButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const HeaderMobileMenuIconButton = (
  props: HeaderMobileMenuIconButtonProps,
) => {
  return (
    <Button
      {...props}
      size="sm"
      variant="ghost"
      className="group relative flex-row items-center gap-2"
      type="button"
    >
      <div className="flex w-4">
        <span className="bg-foreground absolute top-3 h-0.5 w-4 transition-transform group-data-[state=open]:top-4 group-data-[state=open]:-rotate-45" />
        <span className="bg-foreground absolute top-4.5 h-0.5 w-4 transition-transform group-data-[state=open]:top-4 group-data-[state=open]:rotate-45" />
      </div>

      <span>Menu</span>
    </Button>
  );
};
