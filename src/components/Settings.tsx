import React from "react"
import type { OutputMap } from "../App"

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

    return (
        <div className="relative flex justify-center items-center gap-0.25vw">
            <button
                className="nf nf-cod-settings_gear settings clean-button"
                onClick={() => setShowSettings(!showSettings)}
            />

            {showSettings && (
                <div className="flex justify-center items-center gap-2.5 cursor-pointer">
                    {widgetObj &&
                        widgetObj.map(({ name, state, changeState }, index) => {
                            return (
                                <div
                                    key={index}
                                    className="inline-flex justify-center items-center gap-1.25 px-2.5 text-xs accent-main"
                                >
                                    <input
                                        type="checkbox"
                                        id={name}
                                        name={name}
                                        checked={state}
                                        onChange={() => changeState(!state)}
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
