import type React from "react"
import type { SystrayIcon, SystrayOutput } from "zebar"

export interface SystrayProps {
    icon: SystrayIcon
    systrayOuput: SystrayOutput
}

export const Systray: React.FC<SystrayProps> = ({ icon, systrayOuput }) => {
    return (
        <button
            key={icon.id}
            title={icon.tooltip}
            onClick={() => {
                systrayOuput.onLeftClick(icon.id)
            }}
            onContextMenu={(e) => {
                systrayOuput.onRightClick(icon.id)
                e.preventDefault()
            }}
            onAuxClick={(e) => {
                if (e.button == 1) {
                    systrayOuput.onMiddleClick(icon.id)
                }
            }}
            onMouseEnter={() => {
                systrayOuput.onHoverEnter(icon.id)
            }}
            onMouseLeave={() => {
                systrayOuput.onHoverLeave(icon.id)
            }}
            onMouseMove={() => {
                systrayOuput.onHoverMove(icon.id)
            }}
            className="cursor-pointer"
        >
            <img src={icon.iconUrl} />
        </button>
    )
}