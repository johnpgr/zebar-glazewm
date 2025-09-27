import { spotifyService } from "../utils"
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
            const tempId = setInterval(async () => {
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
        <button
            className="clean-button no-underline text-font flex justify-center items-center"
            onMouseEnter={() => setShowSettings(true)}
            onMouseLeave={() => setShowSettings(false)}
        >
            <a
                className="flex items-center gap-0.25vw no-underline text-font"
                href="spotify:home"
                target="_blank"
            >
                <i className="nf nf-fa-spotify"></i>
                {song.length > maxSongLength ? song.substring(0, maxSongLength) + "..." : song}
            </a>
            {showSettings && !["fetching...", "Error", ""].includes(song) ? (
                <div className="flex justify-center items-center gap-1.25 pr-2.5">
                    <button
                        className="nf nf-md-skip_previous clean-button flex justify-center items-center text-font rounded-full cursor-pointer"
                        onClick={async () => {
                            await spotifyService.previousSong()
                            setTimeout(async () => await updateSong(), 1000)
                        }}
                    ></button>
                    <button
                        className="nf nf-md-play_pause clean-button flex justify-center items-center text-font rounded-full cursor-pointer"
                        onClick={async () => {
                            await spotifyService.playPause()
                            setTimeout(async () => await updateSong(), 1000)
                        }}
                    ></button>
                    <button
                        className="nf nf-md-skip_next clean-button flex justify-center items-center text-font rounded-full cursor-pointer"
                        onClick={async () => {
                            await spotifyService.skipSong()
                            setTimeout(async () => await updateSong(), 1000)
                        }}
                    ></button>
                </div>
            ) : null}
        </button>
    )
}
