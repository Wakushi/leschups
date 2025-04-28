import { Card, CardContent } from "@/components/ui/card"
import { Song } from "@/types/song.type"
import { useState } from "react"
import { IoMdTime } from "react-icons/io"
import { AudioPlayer } from "./audio-player"
import { SongSingers } from "./singers"
import { DownloadButtons } from "./download-buttons"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

interface SongCardProps {
  song: Song
  isPlaying: boolean
  onPlayPause: () => void
}

export function SongCard({ song, isPlaying, onPlayPause }: SongCardProps) {
  return (
    <Card className="bg-white border-emerald-100/20 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <CardContent className="pt-6 flex flex-col flex-1">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {song.id}. {song.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">{song.artist}</p>
            <SongSingers singers={song.singers} />
          </div>

          <div className="flex flex-col gap-4 w-full mt-auto">
            {song.instrumental_url ? (
              <AudioPlayer
                isPlaying={isPlaying}
                onPlayPause={onPlayPause}
                duration={song.duration}
                audio={song.audio}
              />
            ) : (
              <div className="flex items-center gap-1 text-gray-500">
                <IoMdTime />
                <p className="text-sm">Instrumentale bientôt disponible</p>
              </div>
            )}
            <DownloadButtons
              lyricsUrl={song.lyrics_url}
              instrumentalUrl={song.instrumental_url}
            />
          </div>
        </div>
        {!!song.lyrics_html?.__html && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="mt-4 text-sm text-gray-700 hover:text-emerald-700"
              >
                Voir les paroles
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[100vw] h-[100dvh] md:max-w-[700px] md:h-[700px] p-0 flex flex-col overflow-hidden bg-emerald-800">
              <DialogTitle className="sr-only">
                Paroles de {song.title}
              </DialogTitle>
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b p-4">
                <div className="max-w-3xl mx-auto ">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {song.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">{song.artist}</p>
                  <AudioPlayer
                    isPlaying={isPlaying}
                    onPlayPause={onPlayPause}
                    duration={song.duration}
                    audio={song.audio}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-emerald-800">
                <div className="max-w-3xl mx-auto">
                  <div
                    className="max-w-none"
                    dangerouslySetInnerHTML={song.lyrics_html}
                  ></div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
