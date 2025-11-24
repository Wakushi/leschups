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
  fetchSongs: () => Promise<void>
}

const SongsContext = createContext<SongsContextProps>({
  songs: [],
  loadingSongs: false,
  setSongs: (songs: Song[]) => {},
  fetchSongs: () => Promise.resolve(),
})

export default function SongsContextProvider(props: SongsContextProviderProps) {
  const [songs, setSongs] = useState<Song[]>([])
  const [loadingSongs, setLoadingSongs] = useState<boolean>(true)

  useEffect(() => {
    fetchSongs()
  }, [])

  async function fetchSongs() {
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
      return
    }

    const songsData: Song[] = await response.json()

    setSongs(songsData)
    setLoadingSongs(false)
  }

  const context: SongsContextProps = {
    songs,
    loadingSongs,
    setSongs,
    fetchSongs,
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
