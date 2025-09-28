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
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  dateOutput,
}) => {
  return (
    <a href="ms-settings:dateandtime" className="gap-1 flex items-center">
      <i className="text-primary nf-md-calendar_month" />
      <div>
        <span>{dateFormat.format(dateOutput.now).replaceAll(", ", " ")}</span>
      </div>
    </a>
  )
}
