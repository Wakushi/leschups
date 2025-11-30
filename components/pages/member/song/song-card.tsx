import { Song } from "@/types/song.type"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Music2, User } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface SongCardProps {
  song: Song
}

export function SongCard({ song }: SongCardProps) {
  return (
    <Link key={song.id} href={`/member/songs/${song.id}`}>
      <Card className="card-gradient group">
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
          <Music2 className="h-16 w-16 text-gray-400" />
        </div>

        <CardHeader className="relative">
          <div className="flex flex-col items-start justify-between gap-2">
            <CardTitle className="text-xl font-bold text-white text-shadow-lg transition-colors line-clamp-2 flex-1">
              {song.title}
            </CardTitle>
            <p className="text-md font-medium text-gray-700/90 line-clamp-1">
              {song.artist}
            </p>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4">
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
              {song.leads.map((singer) => (
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
          {song.choirs.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-white/60 group-hover:bg-white/80 transition-colors">
                  <Heart className="h-4 w-4 text-red-600" />
                </div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Chœurs
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {song.choirs.map((singer) => (
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
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
