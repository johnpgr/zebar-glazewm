import type { GlazeWmOutput } from "zebar"
import { Button } from "./ui/Button"
import { Box } from "./ui/Box"

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
    <Box>
      <Button variant="clean" className="gap-0.5" onClick={onClick}>
        <i className={`text-primary ${iconClass} text-primary`}></i>
        {name}
      </Button>
    </Box>
  )
}
