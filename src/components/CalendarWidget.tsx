import React from "react"
import type { DateOutput, GlazeWmOutput } from "zebar"
import { Button } from "./ui/Button"

const dateFormat = Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
})

export interface CalendarWidgetProps {
  dateOutput: DateOutput
  glazeWmOutput: GlazeWmOutput
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  dateOutput,
  glazeWmOutput,
}) => {
  const handleClick = () => {
    glazeWmOutput.runCommand("shell-exec ms-settings:dateandtime")
  }

  return (
    <Button onClick={handleClick} variant="clean" className="gap-1">
      <i className="text-primary nf-md-calendar_month" />
      <div>
        <span>{dateFormat.format(dateOutput.now).replaceAll(", ", " ")}</span>
      </div>
    </Button>
  )
}
