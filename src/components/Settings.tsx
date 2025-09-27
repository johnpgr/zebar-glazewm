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

const style: React.CSSProperties = {
    cursor: "pointer",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const divStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
}

const settingsStyle: React.CSSProperties = {
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    padding: "0px 10px",
    accentColor: "var(--main-color)",
    fontSize: "10px",
}

const labelStyle: React.CSSProperties = {
    cursor: "pointer",
    whiteSpace: "nowrap",
}

export const Settings: React.FC<SettingsProps> = ({ widgetObj }) => {
    const [showSettings, setShowSettings] = React.useState(false)

    return (
        <div className="logo" style={style}>
            <button
                className="nf nf-cod-settings_gear settings clean-button"
                onClick={() => setShowSettings(!showSettings)}
            />

            {showSettings && (
                <div style={divStyle}>
                    {widgetObj &&
                        widgetObj.map(({ name, state, changeState }, index) => {
                            return (
                                <div key={index} style={settingsStyle}>
                                    <input
                                        type="checkbox"
                                        id={name}
                                        name={name}
                                        checked={state}
                                        onChange={() => changeState(!state)}
                                    />
                                    <label htmlFor={name} style={labelStyle}>
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
