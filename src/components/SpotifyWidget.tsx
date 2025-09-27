import { spotifyService } from "@/lib/spotify"
import { CleanButton } from "@/components/ui/buttons/CleanButton"
import React from "react"

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
    <CleanButton
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
      className="text-foreground no-underline flex justify-center items-center"
    >
      <a
        className="flex items-center gap-0.25vw no-underline"
        href="spotify:home"
        target="_blank"
      >
        <i className="text-primary nf-fa-spotify"></i>
        {song.length > maxSongLength
          ? song.substring(0, maxSongLength) + "..."
          : song}
      </a>
      {showSettings && !["Fetching...", "Error", ""].includes(song) ? (
        <div className="flex justify-center items-center gap-1.25 pr-2.5">
          <CleanButton
            className="text-primary nf-md-skip_previous flex justify-center items-center rounded-full cursor-pointer"
            onClick={async () => {
              await spotifyService.previousSong()
              setTimeout(async () => await updateSong(), 1000)
            }}
          />
          <CleanButton
            className="text-primary nf-md-play_pause flex justify-center items-center rounded-full cursor-pointer"
            onClick={async () => {
              await spotifyService.playPause()
              setTimeout(async () => await updateSong(), 1000)
            }}
          />
          <CleanButton
            className="text-primary nf-md-skip_next flex justify-center items-center rounded-full cursor-pointer"
            onClick={async () => {
              await spotifyService.skipSong()
              setTimeout(async () => await updateSong(), 1000)
            }}
          />
        </div>
      ) : null}
    </CleanButton>
  )
}
