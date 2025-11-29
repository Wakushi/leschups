"use client"
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react"
import { Song } from "@/types/song.type"

interface SongsContextProviderProps {
  children: ReactNode
}

interface SongsContextProps {
  songs: Song[]
  loadingSongs: boolean
  setSongs: (songs: Song[]) => void
  fetchSongs: () => Promise<Song[]>
  getSongById: (id: number) => Promise<Song | null>
}

const SongsContext = createContext<SongsContextProps>({
  songs: [],
  loadingSongs: false,
  setSongs: (songs: Song[]) => {},
  fetchSongs: () => Promise.resolve([]),
  getSongById: (id: number) => Promise.resolve(null),
})

export default function SongsContextProvider(props: SongsContextProviderProps) {
  const USE_LOCAL_DATA = false
  const PROD_URL = "https://www.leschups.fr"

  const [songs, setSongs] = useState<Song[]>([])
  const [loadingSongs, setLoadingSongs] = useState<boolean>(true)

  useEffect(() => {
    fetchSongs()
  }, [])

  async function fetchSongs(): Promise<Song[]> {
    setLoadingSongs(true)

    const response = await fetch(`/api/songs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      setLoadingSongs(false)
      return []
    }

    let songsData: Song[] = await response.json()

    const getFormattedUrl = (url: string | undefined) => {
      if (USE_LOCAL_DATA) return url
      return url ? `${PROD_URL}${url}` : undefined
    }

    if (!USE_LOCAL_DATA) {
      songsData = songsData.map((s) => ({
        ...s,
        audio_url: getFormattedUrl(s.audio_url),
        audio_url_choir_alto: getFormattedUrl(s.audio_url_choir_alto),
        audio_url_choir_sopranes: getFormattedUrl(s.audio_url_choir_sopranes),
        lyrics_url: getFormattedUrl(s.lyrics_url),
        lyrics_url_choir: getFormattedUrl(s.lyrics_url_choir),
        video_url: getFormattedUrl(s.video_url),
      }))
    }

    setSongs(songsData)
    setLoadingSongs(false)

    return songsData
  }

  async function getSongById(id: number): Promise<Song | null> {
    if (!songs.length) {
      const songs = await fetchSongs()

      if (!songs) {
        throw new Error("Failed to fetch songs")
      }

      return songs.find((song) => song.id === id) || null
    }

    const song = songs.find((song) => song.id === id)

    if (!song) {
      throw new Error(`Song with id ${id} not found`)
    }

    return song
  }

  const context: SongsContextProps = {
    songs,
    loadingSongs,
    setSongs,
    fetchSongs,
    getSongById,
  }

  return (
    <SongsContext.Provider value={context}>
      {props.children}
    </SongsContext.Provider>
  )
}

export function useSongs() {
  return useContext(SongsContext)
}
