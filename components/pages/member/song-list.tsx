import { Song } from "@/types/song.type"
import { SongCard } from "./song-card"

interface SongsListProps {
  songs: Song[]
  playingSong: Song | null
  handlePlaySong: (song: Song) => void
}

export function SongsList({
  songs,
  playingSong,
  handlePlaySong,
}: SongsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {songs.map((song, index) => (
        <SongCard
          key={`${song.id}-${index}`}
          song={song}
          isPlaying={playingSong?.id === song.id}
          onPlayPause={() => handlePlaySong(song)}
        />
      ))}
    </div>
  )
}
