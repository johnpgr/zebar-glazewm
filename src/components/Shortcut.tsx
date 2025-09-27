import type { GlazeWmOutput } from "zebar"
import { ShortcutButton } from "./ui/buttons/ShortcutButton"

interface ShortcutProps {
  commandRunner: GlazeWmOutput["runCommand"]
  commands: string[]
  iconClass: string
  name: string
}

export const Shortcut: React.FC<ShortcutProps> = ({
  commandRunner,
  commands,
  iconClass,
  name,
}) => {
  const onClick = () => {
    for (const command of commands) {
      commandRunner(command)
    }
  }

  return (
    <ShortcutButton
      className="text-xs ml-1.25"
      onClick={() => onClick()}
    >
      <i className={`text-primary ${iconClass} text-primary`}></i>
      <span>{name}</span>
    </ShortcutButton>
  )
}
