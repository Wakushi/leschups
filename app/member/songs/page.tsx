"use client"
import { useEffect, useState } from "react"
import { RAW_SONGS } from "@/lib/data/songs"
import { SongsList } from "@/components/pages/member/song-list"
import { Song } from "@/types/song.type"
import { getAudioDuration } from "@/lib/utils"
import { Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaSearch } from "react-icons/fa"

const SONGS_CACHE_KEY = "leschups_songs_cache"
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [playingSong, setPlayingSong] = useState<Song | null>(null)

  useEffect(() => {
    async function loadSongsAudio() {
      setLoading(true)

      try {
        const cachedData = localStorage.getItem(SONGS_CACHE_KEY)

        if (cachedData) {
          const { songs: cachedSongs, timestamp } = JSON.parse(cachedData)

          if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
            const loadedSongs = cachedSongs.map((song: Song) => {
              if (song.instrumental_url) {
                song.audio = new Audio(song.instrumental_url)
              }
              return song
            })

            setSongs(loadedSongs)
            setLoading(false)
            return
          }
        }

        const loadedSongs: Song[] = []

        for (let song of RAW_SONGS) {
          if (song.instrumental_url) {
            song.audio = new Audio(song.instrumental_url)
            song.duration = await getAudioDuration(song.audio)
          }

          loadedSongs.push(song)
        }

        const songsToCache = loadedSongs.map((song) => ({
          ...song,
          audio: undefined,
        }))

        localStorage.setItem(
          SONGS_CACHE_KEY,
          JSON.stringify({
            songs: songsToCache,
            timestamp: Date.now(),
          })
        )

        setSongs(loadedSongs)
      } catch (error) {
        console.error("Error loading songs:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSongsAudio()
  }, [])

  const filteredSongs = songs.filter(
    (song) =>
      song.id.toString().includes(searchTerm.trim().toLowerCase()) ||
      song.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      song.singers.some((singer) =>
        singer.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
  )

  function handlePlaySong(song: Song): void {
    if (playingSong && playingSong.audio) {
      song.isPlaying = false
      playingSong.audio.pause()
    }

    if (song.instrumental_url === playingSong?.instrumental_url) {
      setPlayingSong(null)
      return
    }

    if (!song.audio) return

    song.isPlaying = true
    song.audio.play()

    setPlayingSong(song)
  }

  return (
    <div className="min-h-screen pt-20 bg-main relative">
      <div className="p-8 md:p-12">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <SongsList
            songs={filteredSongs}
            playingSong={playingSong}
            handlePlaySong={handlePlaySong}
          />
        )}
      </div>
    </div>
  )
}

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  const handleClear = () => {
    onChange("")
  }

  return (
    <div className="relative w-full">
      <FaSearch className="absolute text-emerald-600 left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5" />
      <Input
        className="px-9 md:px-12 py-3 md:py-6 text-base md:text-lg text-gray-900 bg-white/80 border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 transition-all rounded-xl shadow-sm"
        placeholder="Rechercher par titre, artiste ou interprète..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-emerald-50 rounded-full"
          onClick={handleClear}
        >
          <X className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
        </Button>
      )}
    </div>
  )
}
