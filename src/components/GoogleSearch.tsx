import React from "react"
import type { GlazeWmOutput } from "zebar"
import { Box } from "./ui/Box"
import * as keys from "@/lib/keys"

export interface GoogleSearchProps {
  commandRunner: GlazeWmOutput["runCommand"]
}

export const GoogleSearch: React.FC<GoogleSearchProps> = ({
  commandRunner,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const search = (form.get("q") ?? "").toString()

    if (inputRef.current) inputRef.current.value = ""

    const encoded = encodeURIComponent(search)
    const url = `${keys.webSearchUrl}${encoded}`
    const openCmd = `shell-exec cmd /c start "" "${url}"`
    commandRunner(openCmd)
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Box className="justify-between gap-1 hover:bg-zinc-800/90">
        <i className="text-primary nf-md-search_web" />
        <input
          ref={inputRef}
          name="q"
          className="bg-transparent border-none text-font outline-none"
          type="text"
          placeholder="Buscar na web"
        />
      </Box>
    </form>
  )
}
