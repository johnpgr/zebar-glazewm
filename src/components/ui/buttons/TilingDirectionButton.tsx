import { cn } from "@/lib/utils"

export const TilingDirectionButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        "bg-secondary text-secondary-foreground border-none cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
