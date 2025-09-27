import { spotifyService } from "@/lib/spotify"
import React from "react"
import { Button } from "./ui/Button"

export const SpotifyWidget = () => {
  const [song, setSong] = React.useState("Fetching...")
  const [showSettings, setShowSettings] = React.useState(false)

  const maxSongLength = window.innerWidth > 1600 ? 30 : 10

  async function updateSong() {
    const tempSong = await spotifyService.getCurrentSong()
    setSong(tempSong)
  }

  let intervalId: number[] = []
  React.useEffect(() => {
    const updateAndSetInterval = async () => {
      await updateSong()
      const tempId = window.setInterval(async () => {
        await updateSong()
      }, 1000 * 10)
      intervalId.push(tempId)
    }

    updateAndSetInterval()

    return () => {
      for (const id of intervalId) {
        clearInterval(id)
      }
    }
  }, [])

  return (
    <Button
      variant="clean"
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
      className="text-foreground no-underline"
    >
      <a
        className="flex items-center gap-0.25vw no-underline"
        href="spotify:home"
        target="_blank"
      >
        <i className="text-primary nf-fa-spotify mr-1"></i>
        {song.length > maxSongLength
          ? song.substring(0, maxSongLength) + "..."
          : song}
      </a>
      {showSettings && !["Fetching...", "Error", ""].includes(song) && (
        <div className="gap-1.25 pr-2.5 ml-2">
          <Button
            variant="clean"
            className="hover:text-foreground/80 transition-transform duration-200"
            onClick={async () => {
              await spotifyService.previousSong()
              setTimeout(async () => await updateSong(), 1000)
            }}
          >
            <i className="text-xs nf-md-skip_previous " />
          </Button>
          <Button
            variant="clean"
            className="hover:text-foreground/80 transition-transform duration-200"
            onClick={async () => {
              await spotifyService.playPause()
              setTimeout(async () => await updateSong(), 1000)
            }}
          >
            <i className="text-xs nf-md-play_pause"></i>
          </Button>
          <Button
            variant="clean"
            className="hover:text-foreground/80 transition-transform duration-200"
            onClick={async () => {
              await spotifyService.skipSong()
              setTimeout(async () => await updateSong(), 1000)
            }}
          >
            <i className="text-xs nf-md-skip_next" />
          </Button>
        </div>
      )}
    </Button>
  )
}
