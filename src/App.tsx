import React from "react"
import { createProviderGroup, type BatteryOutput, type WeatherOutput } from "zebar"
import { Systray } from "./components/Systray"
import { SpotifyWidget } from "./components/SpotifyWidget"
import { GoogleSearch } from "./components/GoogleSearch"
import { Settings } from "./components/Settings"
import { Shortcut } from "./components/Shortcut"
import { ActiveApp } from "./components/ActiveApp"
import { useLocalStorage } from "./hooks/useLocalStorage"
import * as keys from "./keys"

const providers = createProviderGroup({
    keyboard: { type: "keyboard" },
    glazewm: { type: "glazewm" },
    cpu: { type: "cpu" },
    date: { type: "date", formatting: "EEE d MMM t" },
    battery: { type: "battery" },
    memory: { type: "memory" },
    weather: { type: "weather" },
    host: { type: "host" },
    systray: { type: "systray" },
})

export type OutputMap = typeof providers.outputMap

const DATE_FORMATS = {
    short: Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }),
    long: Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }),
} as const

export const App: React.FC = () => {
    const [output, setOutput] = React.useState<OutputMap>(providers.outputMap)
    const [showGoogleSearch, setShowGoogleSearch] = useLocalStorage("showGoogleSearch", false)
    const [showShortcuts, setShowShortcuts] = useLocalStorage("showShortcuts", true)
    const [showActiveApp, setShowActiveApp] = useLocalStorage("showActiveApp", true)
    const [showSpotifyWidget, setShowSpotifyWidget] = useLocalStorage("showSpotifyWidget", true)
    const [dateFormatter, setDateFormatter] = React.useState(DATE_FORMATS.short)

    React.useEffect(() => {
        providers.onOutput(() => setOutput(providers.outputMap))
    }, [])

    function getBatteryIcon(batteryOutput: BatteryOutput) {
        if (batteryOutput.chargePercent > 90) return <i className="nf nf-fa-battery_4"></i>
        if (batteryOutput.chargePercent > 70) return <i className="nf nf-fa-battery_3"></i>
        if (batteryOutput.chargePercent > 40) return <i className="nf nf-fa-battery_2"></i>
        if (batteryOutput.chargePercent > 20) return <i className="nf nf-fa-battery_1"></i>
        return <i className="nf nf-fa-battery_0"></i>
    }

    function getWeatherIcon(weatherOutput: WeatherOutput) {
        switch (weatherOutput.status) {
            case "clear_day":
                return <i className="nf nf-weather-day_sunny"></i>
            case "clear_night":
                return <i className="nf nf-weather-night_clear"></i>
            case "cloudy_day":
                return <i className="nf nf-weather-day_cloudy"></i>
            case "cloudy_night":
                return <i className="nf nf-weather-night_alt_cloudy"></i>
            case "light_rain_day":
                return <i className="nf nf-weather-day_sprinkle"></i>
            case "light_rain_night":
                return <i className="nf nf-weather-night_alt_sprinkle"></i>
            case "heavy_rain_day":
                return <i className="nf nf-weather-day_rain"></i>
            case "heavy_rain_night":
                return <i className="nf nf-weather-night_alt_rain"></i>
            case "snow_day":
                return <i className="nf nf-weather-day_snow"></i>
            case "snow_night":
                return <i className="nf nf-weather-night_alt_snow"></i>
            case "thunder_day":
                return <i className="nf nf-weather-day_lightning"></i>
            case "thunder_night":
                return <i className="nf nf-weather-night_alt_lightning"></i>
        }
    }

    return (
        <div className="app">
            <div className="left">
                <div className="box">
                    <div className="logo">
                        <i className="nf nf-custom-windows ico"></i>
                        {output.host?.friendlyOsVersion}
                    </div>
                    {output.glazewm && (
                        <div className="workspaces">
                            {output.glazewm.currentWorkspaces.map((workspace) => (
                                <button
                                    className={`workspace ${workspace.hasFocus && "focused"} ${workspace.isDisplayed && "displayed"}`}
                                    onClick={() =>
                                        output.glazewm!.runCommand(
                                            `focus --workspace ${workspace.name}`,
                                        )
                                    }
                                    key={workspace.name}
                                >
                                    {workspace.displayName ?? workspace.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {showShortcuts && output.glazewm && (
                    <div className="workspaces">
                        <Shortcut
                            commandRunner={output.glazewm.runCommand}
                            commands={[`shell-exec ${keys.browserPath}`]}
                            iconClass="nf-md-web"
                            name="edge"
                        />
                        <Shortcut
                            commandRunner={output.glazewm.runCommand}
                            commands={[`shell-exec ${keys.powershellPath} -nologo`]}
                            iconClass="nf-cod-terminal_powershell"
                            name="Powershell"
                        />
                    </div>
                )}
            </div>

            <div className="center">
                <div className="box">
                    {showSpotifyWidget && <SpotifyWidget />}
                    <i className="nf nf-md-calendar_month"></i>
                    <button
                        className="clean-button"
                        onMouseEnter={() => {
                            setDateFormatter(DATE_FORMATS.long)
                        }}
                        onMouseLeave={() => {
                            setDateFormatter(DATE_FORMATS.short)
                        }}
                    >
                        {output.date?.now ? dateFormatter.format(new Date(output.date.now)) : ""}
                    </button>
                    {showActiveApp && output.glazewm && <ActiveApp output={output} />}
                </div>
            </div>

            <div className="right">
                {showGoogleSearch && output.glazewm && (
                    <GoogleSearch
                        commandRunner={output.glazewm.runCommand}
                        explorerPath={keys.explorerPath}
                    />
                )}
                <div className="box" style={{ gap: "4px" }}>
                    {output.systray &&
                        output.systray.icons.map((icon) => (
                            <Systray icon={icon} systrayOuput={output.systray!} />
                        ))}
                    {output.glazewm && (
                        <>
                            {output.glazewm.bindingModes.map((bindingMode) => (
                                <button className="binding-mode" key={bindingMode.name}>
                                    {bindingMode.displayName ?? bindingMode.name}
                                </button>
                            ))}

                            <button
                                className={`tiling-direction nf ${output.glazewm.tilingDirection === "horizontal" ? "nf-md-swap_horizontal" : "nf-md-swap_vertical"}`}
                                onClick={() =>
                                    output.glazewm!.runCommand("toggle-tiling-direction")
                                }
                            />
                        </>
                    )}
                    <Settings
                        widgetObj={[
                            {
                                name: "Spotify",
                                state: showSpotifyWidget,
                                changeState: setShowSpotifyWidget,
                            },
                            {
                                name: "App",
                                state: showActiveApp,
                                changeState: setShowActiveApp,
                            },
                            {
                                name: "Search",
                                state: showGoogleSearch,
                                changeState: setShowGoogleSearch,
                            },
                            {
                                name: "Shortcuts",
                                state: showShortcuts,
                                changeState: setShowShortcuts,
                            },
                        ]}
                        output={output}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        {/* memory */}
                        {output.memory && (
                            <button
                                className="memory clean-button"
                                onClick={() => output.glazewm!.runCommand("shell-exec taskmgr")}
                            >
                                <i className="nf nf-fae-chip"></i>
                                {Math.round(output.memory.usage)}%
                            </button>
                        )}

                        {/* cpu */}
                        {output.cpu && (
                            <button
                                className="cpu clean-button"
                                onClick={() => output.glazewm!.runCommand("shell-exec taskmgr")}
                            >
                                <i className="nf nf-oct-cpu"></i>

                                {/* Change the text color if the CPU usage is high. */}
                                <span className={output.cpu.usage > 85 ? "high-usage" : ""}>
                                    {Math.round(output.cpu.usage)}%
                                </span>
                            </button>
                        )}

                        {/* battery */}
                        {output.battery && (
                            <div className="battery">
                                {/* Show icon for whether battery is charging. */}
                                {output.battery.isCharging && (
                                    <i className="nf nf-md-power_plug charging-icon"></i>
                                )}
                                {getBatteryIcon(output.battery)}
                                {Math.round(output.battery.chargePercent)}%
                            </div>
                        )}

                        {/* weather */}
                        {output.weather && (
                            <div className="weather">
                                {getWeatherIcon(output.weather)}
                                {Math.round(output.weather.celsiusTemp)}
                                °C
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
