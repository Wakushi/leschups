"use client"

import Fuse from "fuse.js"
import { Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Song } from "@/types/song.type"
import { SongCard } from "@/components/pages/member/song/song-card"
import { useSongs } from "@/providers/songs-store"

export default function SongsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { songs, loadingSongs } = useSongs()

  if (loadingSongs) {
    return <div>Loading...</div>
  }

  let filteredSongs: Song[] = songs

  if (searchQuery.length > 2) {
    const fuse = new Fuse(songs, {
      keys: ["title", "artist", "leads", "choirs"],
      includeScore: true,
      threshold: 0.4,
      findAllMatches: false,
    })

    const results = fuse.search(searchQuery)
    filteredSongs = results.map((result) => result.item as Song)
  }

  return (
    <div className="min-h-screen pt-20 bg-main relative">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song) => {
            return <SongCard key={song.id} song={song} />
          })}
        </div>
      </div>
    </div>
  )
}

function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
}) {
  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Rechercher une chanson, un artiste ou un interprète..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-6 text-black bg-white/90 border-gray-200 focus:bg-white shadow-md"
      />
    </div>
  )
}
