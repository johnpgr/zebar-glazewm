import type { GlazeWmOutput } from "zebar"

interface ShortcutProps {
    commandRunner: GlazeWmOutput["runCommand"]
    commands: string[]
    iconClass: string
    name: string
}

export const Shortcut: React.FC<ShortcutProps> = ({ commandRunner, commands, iconClass, name }) => {
    const onClick = () => {
        for (const command of commands) {
            commandRunner(command)
        }
    }

    return (
        <button
            className="shortcut clean-button text-xs ml-1.25 [&_.nf]:text-font"
            onClick={() => onClick()}
        >
            <i className={`nf ${iconClass}`}></i>
            <span>{name}</span>
        </button>
    )
}
