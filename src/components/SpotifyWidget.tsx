import { spotifyService } from "../utils"
import React from "react"

const style: React.CSSProperties = {
    textDecoration: "none",
    color: "var(--font-color)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const settingsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    paddingRight: "10px",
}

const iconStyle: React.CSSProperties = {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "var(--font-color)",
    borderRadius: "50%",
}

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
            className="clean-button"
            onMouseEnter={() => setShowSettings(true)}
            onMouseLeave={() => setShowSettings(false)}
            style={style}
        >
            <a className="logo" href="spotify:home" target="_blank" style={style}>
                <i className="nf nf-fa-spotify"></i>
                {song.length > maxSongLength ? song.substring(0, maxSongLength) + "..." : song}
            </a>
            {showSettings && !["fetching...", "Error", ""].includes(song) ? (
                <div style={settingsStyle}>
                    <button
                        className="nf nf-md-skip_previous clean-button"
                        style={iconStyle}
                        onClick={async () => {
                            await spotifyService.previousSong()
                            setTimeout(async () => await updateSong(), 1000)
                        }}
                    ></button>
                    <button
                        className="nf nf-md-play_pause clean-button"
                        style={iconStyle}
                        onClick={async () => {
                            await spotifyService.playPause()
                            setTimeout(async () => await updateSong(), 1000)
                        }}
                    ></button>
                    <button
                        className="nf nf-md-skip_next clean-button"
                        style={iconStyle}
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
