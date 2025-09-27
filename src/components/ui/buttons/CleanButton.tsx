import { cn } from "@/lib/utils"

export const CleanButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        "bg-transparent border-none cursor-pointer text-foreground",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
