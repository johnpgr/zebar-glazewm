import React from "react"
import type { OutputMap } from "@/lib/providers"
import { Button } from "./ui/Button"
import { Checkbox } from "./ui/Checkbox"
import autoAnimate from "@formkit/auto-animate"

export interface WidgetObj {
  name: string
  state: boolean
  changeState: (state: boolean) => void
}

export interface SettingsProps {
  widgetObj: WidgetObj[]
  output: OutputMap
}

export const Settings: React.FC<SettingsProps> = ({ widgetObj }) => {
  const [showSettings, setShowSettings] = React.useState(false)

  const ref = React.useCallback((node: HTMLElement | null) => {
    if (node) {
      autoAnimate(node)
    }
  }, [])

  return (
    <div ref={ref} className="relative flex justify-center items-center gap-1">
      <Button
        variant="secondary"
        onClick={() => setShowSettings(!showSettings)}
      >
        <i className="text-xs text-foreground nf-cod-settings_gear" />
      </Button>

      {showSettings && (
        <div className="flex justify-center items-center gap-1 cursor-pointer">
          {widgetObj &&
            widgetObj.map(({ name, state, changeState }, index) => {
              return (
                <div
                  key={index}
                  className="inline-flex justify-center items-center gap-0.5 text-xs accent-main"
                >
                  <Checkbox
                    id={name}
                    name={name}
                    checked={state}
                    onCheckedChange={() => changeState(!state)}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={name}
                    className="cursor-pointer whitespace-nowrap"
                  >
                    {name}
                  </label>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
