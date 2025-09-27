import React from "react"
import type { GlazeWmOutput } from "zebar"
import { Box } from "./ui/Box"

export interface GoogleSearchProps {
  commandRunner: GlazeWmOutput["runCommand"]
  explorerPath: string
}

export const GoogleSearch: React.FC<GoogleSearchProps> = ({
  commandRunner,
  explorerPath,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const search = (form.get("q") ?? "").toString()

    if (inputRef.current) inputRef.current.value = ""

    commandRunner(`focus --workspace 5`)
    const encoded = encodeURIComponent(search)
    commandRunner(
      `shell-exec ${explorerPath} https://www.google.com/search?q=${encoded}`,
    )
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Box style={{ justifyContent: "space-between", gap: "0.25vw" }}>
        <i className="text-primary nf-fa-google"></i>
        <input
          ref={inputRef}
          name="q"
          className="bg-transparent border-none text-font outline-none"
          type="text"
          placeholder="Search on Google"
        />
      </Box>
    </form>
  )
}
