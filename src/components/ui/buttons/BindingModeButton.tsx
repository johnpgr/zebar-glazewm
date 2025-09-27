import { cn } from "@/lib/utils"

export const BindingModeButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        "bg-secondary text-secondary-foreground rounded-sm leading-[1] px-2 py-1 border-0 cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
