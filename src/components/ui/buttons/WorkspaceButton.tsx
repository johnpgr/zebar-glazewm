import { cn } from "@/lib/utils"
import React from "react"

export interface WorkspaceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  displayed?: boolean
  focused?: boolean
}

export const WorkspaceButton: React.FC<WorkspaceButtonProps> = ({
  children,
  displayed,
  focused,
  className,
  ...rest
}) => {
  return (
    <button
      className={cn(
        "mr-1 px-2 py-1 text-secondary-foreground border-0 cursor-pointer rounded-sm hover:bg-primary",
        displayed ? "bg-secondary" : "bg-secondary/50",
        focused ? "transform scale-90" : "",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default WorkspaceButton
