import * as keys from "./keys"

type SpotifyApiResponse = any

class SpotifyService {
  private readonly tokenKey = "access_token"

  private getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  private async updateAccessToken(): Promise<void> {
    if (
      !keys.spotifyRefreshToken ||
      !keys.spotifyClientId ||
      !keys.spotifyClientSecret
    ) {
      console.error("Missing required keys for refreshing access token")
      return
    }

    const url = "https://accounts.spotify.com/api/token"
    const payload: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: keys.spotifyRefreshToken,
        client_id: keys.spotifyClientId,
        client_secret: keys.spotifyClientSecret,
      }).toString(),
    }

    try {
      const response = await fetch(url, payload)
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`)
        console.error(await response.text())
        return
      }

      const data = await response.json()
      if (data.access_token) {
        localStorage.setItem(this.tokenKey, data.access_token)
      } else {
        console.error("Invalid response data", data)
      }
    } catch (e) {
      console.error("Failed to update access token", e)
    }
  }

  private async fetchSpotifyApi(
    path: string,
    options: RequestInit = {},
  ): Promise<SpotifyApiResponse | undefined> {
    const accessToken = this.getAccessToken()
    if (!accessToken) {
      console.error("Access token not found")
      return
    }

    const url = `https://api.spotify.com/v1${path}`
    const payload: RequestInit = {
      ...options,
      headers: {
        ...((options && options.headers) || {}),
        Authorization: "Bearer " + accessToken,
      },
    }

    try {
      const response = await fetch(url, payload)
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`)
        console.error(await response.text())
        return
      }

      if (response.status === 204) {
        return { is_playing: false }
      }

      return await response.json()
    } catch (e) {
      console.error("Failed to fetch Spotify API", e)
      throw e
    }
  }

  private async sendSpotifyApi(path: string, method: "POST" | "PUT") {
    const accessToken = this.getAccessToken()
    if (!accessToken) {
      console.error("Access token not found")
      return false
    }

    const url = `https://api.spotify.com/v1${path}`
    const payload: RequestInit = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      method,
    }

    try {
      const response = await fetch(url, payload)
      if (response.status !== 200) {
        console.error(`HTTP error! status: ${response.status}`)
        console.error(await response.text())
        return false
      }

      return true
    } catch (e) {
      console.error("Failed to fetch Spotify API", e)
      throw e
    }
  }

  private async fetchCurrentSong(): Promise<SpotifyApiResponse | undefined> {
    const song = await this.fetchSpotifyApi("/me/player/currently-playing", {
      method: "GET",
    })
    if (!song) {
      await this.updateAccessToken()
      return await this.fetchSpotifyApi("/me/player/currently-playing", {
        method: "GET",
      })
    }
    return song
  }

  async skipSong(): Promise<string> {
    const response = await this.sendSpotifyApi("/me/player/next", "POST")
    if (!response) {
      await this.updateAccessToken()
      await this.sendSpotifyApi("/me/player/next", "POST")
    }
    return "success"
  }

  async previousSong(): Promise<string> {
    const response = await this.sendSpotifyApi("/me/player/previous", "POST")
    if (!response) {
      await this.updateAccessToken()
      await this.sendSpotifyApi("/me/player/previous", "POST")
    }
    return "success"
  }

  async getCurrentSong(): Promise<string> {
    try {
      const result = await this.fetchCurrentSong()
      return result && result.is_playing ? result.item.name : "---"
    } catch (e) {
      return "Error"
    }
  }

  async playPause(): Promise<void> {
    let song = await this.fetchSpotifyApi("/me/player/currently-playing", {
      method: "GET",
    })
    if (!song || !song.is_playing) {
      await this.updateAccessToken()
      song = await this.fetchSpotifyApi("/me/player/currently-playing", {
        method: "GET",
      })
    }
    if (!song) {
      return
    }
    song.is_playing
      ? await this.sendSpotifyApi("/me/player/pause", "PUT")
      : await this.sendSpotifyApi("/me/player/play", "PUT")
  }
}

export const spotifyService = new SpotifyService()
