import { cn } from "@/lib/utils"

export const ShortcutButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, style, ...rest }) => (
  <button
    className={cn(
      "bg-background px-2 py-1 text-foreground border border-primary rounded-md cursor-pointer transition-all duration-300",
      className,
    )}
    {...rest}
  >
    {children}
  </button>
)
