import { cn } from "@/lib/utils"
import React from "react"

export const SettingsButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, style, ...rest }) => (
  <button
    className={cn(
      "bg-secondary text-secondary-foreground px-2 py-1 border-none rounded-md cursor-pointer transition-all duration-300",
      className,
    )}
    {...rest}
  >
    {children}
  </button>
)
