import React from "react"
import { type BatteryOutput, type WeatherOutput } from "zebar"
import { ActiveApp } from "./components/ActiveApp"
import { GoogleSearch } from "./components/GoogleSearch"
import { Settings } from "./components/Settings"
import { Shortcut } from "./components/Shortcut"
import { SpotifyWidget } from "./components/SpotifyWidget"
import { Systray } from "./components/Systray"
import { Box } from "./components/ui/Box"
import { useLocalStorage } from "./hooks/useLocalStorage"
import * as keys from "./lib/keys"
import { providers, type OutputMap } from "./lib/providers"
import { Button } from "./components/ui/Button"
import { cn } from "./lib/utils"
import { CalendarWidget } from "./components/CalendarWidget"

const BatteryIcon = ({ batteryOutput }: { batteryOutput: BatteryOutput }) => {
  if (batteryOutput.chargePercent > 90)
    return <i className="text-primary nf-fa-battery_4"></i>
  if (batteryOutput.chargePercent > 70)
    return <i className="text-primary nf-fa-battery_3"></i>
  if (batteryOutput.chargePercent > 40)
    return <i className="text-primary nf-fa-battery_2"></i>
  if (batteryOutput.chargePercent > 20)
    return <i className="text-primary nf-fa-battery_1"></i>
  return <i className="text-primary nf-fa-battery_0"></i>
}

const WeatherIcon = ({ weatherOutput }: { weatherOutput: WeatherOutput }) => {
  switch (weatherOutput.status) {
    case "clear_day":
      return <i className="text-primary nf-weather-day_sunny"></i>
    case "clear_night":
      return <i className="text-primary nf-weather-night_clear"></i>
    case "cloudy_day":
      return <i className="text-primary nf-weather-day_cloudy"></i>
    case "cloudy_night":
      return <i className="text-primary nf-weather-night_alt_cloudy"></i>
    case "light_rain_day":
      return <i className="text-primary nf-weather-day_sprinkle"></i>
    case "light_rain_night":
      return <i className="text-primary nf-weather-night_alt_sprinkle"></i>
    case "heavy_rain_day":
      return <i className="text-primary nf-weather-day_rain"></i>
    case "heavy_rain_night":
      return <i className="text-primary nf-weather-night_alt_rain"></i>
    case "snow_day":
      return <i className="text-primary nf-weather-day_snow"></i>
    case "snow_night":
      return <i className="text-primary nf-weather-night_alt_snow"></i>
    case "thunder_day":
      return <i className="text-primary nf-weather-day_lightning"></i>
    case "thunder_night":
      return <i className="text-primary nf-weather-night_alt_lightning"></i>
    default:
      return null
  }
}

export const App: React.FC = () => {
  const [output, setOutput] = React.useState<OutputMap>(providers.outputMap)
  const [showGoogleSearch, setShowGoogleSearch] = useLocalStorage(
    "showGoogleSearch",
    false,
  )
  const [showShortcuts, setShowShortcuts] = useLocalStorage(
    "showShortcuts",
    true,
  )
  const [showActiveApp, setShowActiveApp] = useLocalStorage(
    "showActiveApp",
    true,
  )
  const [showSpotifyWidget, setShowSpotifyWidget] = useLocalStorage(
    "showSpotifyWidget",
    true,
  )

  React.useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap))
  }, [])

  return (
    <div className="grid grid-cols-3 items-center h-full px-0.5vw py-0.5 whitespace-nowrap text-foreground text-xs overflow-hidden mx-1.25">
      <div className="flex items-center gap-1">
        <Box className="gap-1.5">
          <div className="flex flex-row gap-1 items-center">
            <i className="text-primary text-xs nf-custom-windows" />
            {output.host?.friendlyOsVersion}
          </div>
          {output.glazewm && (
            <div className="flex gap-0.5 items-center">
              {output.glazewm.currentWorkspaces.map((workspace) => (
                <Button
                  variant={workspace.hasFocus ? "default" : "secondary"}
                  onClick={() =>
                    output.glazewm?.runCommand(
                      `focus --workspace ${workspace.name}`,
                    )
                  }
                  key={workspace.name}
                >
                  {workspace.displayName ?? workspace.name}
                </Button>
              ))}
            </div>
          )}
        </Box>

        {showShortcuts && output.glazewm && (
          <div className="flex items-center gap-1">
            <Shortcut
              commandRunner={output.glazewm.runCommand}
              commands={[`shell-exec ${keys.browserPath}`]}
              iconClass="nf-md-web"
              name="Browser"
            />
            <Shortcut
              commandRunner={output.glazewm.runCommand}
              commands={[`shell-exec ${keys.terminalPath}`]}
              iconClass="nf-cod-terminal"
              name="Terminal"
            />
          </div>
        )}
      </div>

      <Box className="gap-1 justify-self-center">
        {showSpotifyWidget && <SpotifyWidget />}
        {output.date && output.glazewm && (
          <CalendarWidget dateOutput={output.date} />
        )}
        {showActiveApp && output.glazewm && <ActiveApp output={output} />}
      </Box>

      <div className="justify-self-end flex gap-1 items-center">
        {showGoogleSearch && output.glazewm && (
          <GoogleSearch commandRunner={output.glazewm.runCommand} />
        )}
        <Box className="gap-1">
          {output.systray &&
            output.systray.icons.map((icon) => (
              <Systray icon={icon} systrayOuput={output.systray!} />
            ))}
          {output.glazewm && (
            <>
              {output.glazewm.bindingModes.map((bindingMode) => (
                <Button variant="secondary" key={bindingMode.name}>
                  {bindingMode.displayName ?? bindingMode.name}
                </Button>
              ))}

              <Button
                variant="secondary"
                onClick={() =>
                  output.glazewm!.runCommand("toggle-tiling-direction")
                }
              >
                <i
                  className={cn("text-xs", {
                    "nf-md-swap_horizontal":
                      output.glazewm.tilingDirection === "horizontal",
                    "nf-md-swap_vertical":
                      output.glazewm.tilingDirection === "vertical",
                  })}
                />
              </Button>
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
                name: "Active apps",
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
          <div className="flex flex-row items-center gap-1">
            {/* memory */}
            {output.memory && (
              <Button
                variant="clean"
                className="gap-1"
                onClick={() => output.glazewm?.runCommand("shell-exec taskmgr")}
              >
                <i className="text-primary nf-fae-chip"></i>
                {Math.round(output.memory.usage)}%
              </Button>
            )}

            {/* cpu */}
            {output.cpu && (
              <Button
                variant="clean"
                className="gap-1 -ml-1"
                onClick={() => output.glazewm?.runCommand("shell-exec taskmgr")}
              >
                <i className="text-primary nf-oct-cpu"></i>
                {output.cpu.usage > 85 ? (
                  <span className="text-red-700">
                    {Math.round(output.cpu.usage)}%
                  </span>
                ) : (
                  <span>{Math.round(output.cpu.usage)}%</span>
                )}
              </Button>
            )}

            {/* battery */}
            {output.battery && (
              <div className="relative flex items-center gap-1">
                {output.battery.isCharging && (
                  <span className="absolute text-[8px] left-[-8px] top-1 text-primary nf-md-power_plug" />
                )}
                <BatteryIcon batteryOutput={output.battery} />
                {Math.round(output.battery.chargePercent)}%
              </div>
            )}

            {/* weather */}
            {output.weather && (
              <div className="flex items-center gap-1">
                <WeatherIcon weatherOutput={output.weather} />
                {Math.round(output.weather.celsiusTemp)}°C
              </div>
            )}
          </div>
        </Box>
      </div>
    </div>
  )
}
