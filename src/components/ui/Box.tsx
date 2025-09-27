import React from "react"
import { cn } from "@/lib/utils"

export const Box: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "bg-background border border-primary px-4 py-2 rounded-lg flex items-center backdrop-invert transition-all duration-300",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}