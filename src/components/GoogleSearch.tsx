import React from "react"
import type { GlazeWmOutput } from "zebar"

export interface GoogleSearchProps {
    commandRunner: GlazeWmOutput["runCommand"]
    explorerPath: string
}

const style: React.CSSProperties = {
    justifyContent: "space-between",
}

const inputStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    color: "var(--font-color)",
    outline: "none",
}

export const GoogleSearch: React.FC<GoogleSearchProps> = ({ commandRunner, explorerPath }) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const search = (form.get("q") ?? "").toString()

        if (inputRef.current) inputRef.current.value = ""

        // focus workspace then open the search in explorer
        commandRunner(`focus --workspace 5`)
        const encoded = encodeURIComponent(search)
        commandRunner(`shell-exec ${explorerPath} https://www.google.com/search?q=${encoded}`)
    }

    return (
        <form className="logo box" style={style} onSubmit={(e) => onSubmit(e)}>
            <i className="nf nf-fa-google"></i>
            <input
                ref={inputRef}
                name="q"
                style={inputStyle}
                type="text"
                placeholder="Search on Google"
            />
        </form>
    )
}