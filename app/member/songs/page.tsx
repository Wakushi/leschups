"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SIMPLE_SONGS } from "@/lib/data/songs"
import { Music2, User, Search } from "lucide-react"
import Fuse from "fuse.js"
import { useState } from "react"
import { SimpleSong } from "@/types/song.type"

export default function SongsPage() {
  const [songs, setSongs] = useState<SimpleSong[]>(SIMPLE_SONGS)
  const [searchQuery, setSearchQuery] = useState<string>("")

  function filterSongs(query: string): void {
    setSearchQuery(query)

    if (query.length < 3) {
      setSongs(SIMPLE_SONGS)
      return
    }

    const fuse = new Fuse(SIMPLE_SONGS, {
      keys: ["title", "artist", "singers"],
      includeScore: true,
      threshold: 0.4,
      findAllMatches: false,
    })

    const results = fuse.search(query)
    setSongs(results.map((result) => result.item as SimpleSong))
  }

  return (
    <div className="min-h-screen pt-20 bg-main relative">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une chanson, un artiste ou un interprète..."
              value={searchQuery}
              onChange={(e) => filterSongs(e.target.value)}
              className="pl-10 pr-4 py-6 text-black bg-white/90 border-gray-200 focus:bg-white shadow-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => {
            return (
              <Link key={song.id} href={`/member/songs/${song.id}`}>
                <Card className="card-gradient group">
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Music2 className="h-16 w-16 text-gray-400" />
                  </div>

                  <CardHeader className="relative z-10">
                    <div className="flex flex-col items-start justify-between gap-2">
                      <CardTitle className="text-xl font-bold text-white text-shadow-lg transition-colors line-clamp-2 flex-1">
                        {song.title}
                      </CardTitle>
                      <p className="text-md font-medium text-gray-700/90 line-clamp-1">
                        {song.artist}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-white/60 group-hover:bg-white/80 transition-colors">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Interprètes
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {song.singers.map((singer) => (
                          <Badge
                            key={singer}
                            variant="secondary"
                            className="bg-white/80 hover:bg-white text-gray-700 border border-gray-200 shadow-sm group-hover:shadow transition-shadow"
                          >
                            {singer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
