"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Loader2, Music, Users2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { VideoPlayer } from "@/components/pages/member/song/video-player"
import { LyricsSection } from "@/components/pages/member/song/lyrics-section"
import { SingerBadges } from "@/components/pages/member/song/singer-badges"
import DownloadButton from "@/components/ui/download-button"
import { useSongs } from "@/providers/songs-store"
import { Song, SongAudio, SongAudioType } from "@/types/song.type"
import { getAudioDuration } from "@/lib/utils"
import { AudioPlayer } from "@/components/pages/member/song/audio-player"

export default function SongDetailPage() {
  const params = useParams()
  const { getSongById, loadingSongs } = useSongs()

  const [song, setSong] = useState<Song | null>(null)
  const [songAudios, setSongAudios] = useState<SongAudio[]>([])
  const [playingSong, setPlayingSong] = useState<SongAudio | null>(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadSongsAudio() {
      try {
        setLoading(true)

        const song = await getSongById(Number(params?.id))

        if (!song) {
          setLoading(false)
          return
        }

        const t0 = Date.now()

        const durationsToCompute: {
          url: string
          type: SongAudioType
          promise: Promise<number>
        }[] = []

        if (song.audio_url) {
          durationsToCompute.push({
            url: song.audio_url,
            type: SongAudioType.INSTRUMENTAL,
            promise: getAudioDuration(new Audio(song.audio_url)),
          })
        }

        if (song.audio_url_choir_alto) {
          durationsToCompute.push({
            url: song.audio_url_choir_alto,
            type: SongAudioType.CHOIR_ALTO,
            promise: getAudioDuration(new Audio(song.audio_url_choir_alto)),
          })
        }

        if (song.audio_url_choir_sopranes) {
          durationsToCompute.push({
            url: song.audio_url_choir_sopranes,
            type: SongAudioType.CHOIR_SOPRANES,
            promise: getAudioDuration(new Audio(song.audio_url_choir_sopranes)),
          })
        }

        const durations = await Promise.all(
          durationsToCompute.map(({ url, type, promise }) =>
            promise.then((duration) => ({ url, type, duration }))
          )
        )

        const loadedSongAudios: SongAudio[] = durations.map(
          ({ url, type, duration }) => ({
            audio: new Audio(url),
            audio_url: url,
            duration,
            isPlaying: false,
            type,
          })
        )

        console.log(
          `Loaded ${loadedSongAudios.length} audio${
            durations.length > 1 ? "s" : ""
          } for song ${params?.id} in ${Date.now() - t0}ms`
        )

        setSong(song)
        setSongAudios(loadedSongAudios)
      } catch (error) {
        console.error(`Failed to load song ${params?.id}`, error)
      } finally {
        setLoading(false)
      }
    }

    loadSongsAudio()
  }, [loadingSongs])

  function handlePlaySong(songAudio?: SongAudio): void {
    if (!songAudio) return

    if (playingSong && playingSong.audio) {
      songAudio.isPlaying = false
      playingSong.audio.pause()
    }

    if (songAudio.audio_url === playingSong?.audio_url) {
      setPlayingSong(null)
      return
    }

    if (!songAudio.audio) return

    songAudio.isPlaying = true
    songAudio.audio.play()

    setPlayingSong(songAudio)
  }

  function getSongAudio(type: SongAudioType): SongAudio | undefined {
    return songAudios.find((songAudio) => songAudio.type === type)
  }

  if (loadingSongs || loading) {
    return (
      <div className="min-h-screen pt-20 bg-main relative">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-8 h-[500px] max-w-5xl">
          <Loader2 className="w-10 h-10 animate-spin text-white mx-auto" />
        </div>
      </div>
    )
  }

  if (!song) {
    return (
      <div className="min-h-screen pt-20 bg-main relative">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link href="/member/songs">
            <Button
              variant="ghost"
              className="mb-4 md:mb-6 text-white hover:text-main"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste
            </Button>
          </Link>

          <Card className="bg-white border-emerald-100/20 shadow-md">
            <CardContent className="py-12 text-center">
              <Music className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Cette chanson n'existe pas
              </CardTitle>
              <p className="text-gray-600 mb-6">
                La chanson que vous recherchez n'a pas été trouvée.
              </p>
              <Link href="/member/songs">
                <Button>Retour à la liste des chansons</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-main relative pb-12">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        {/* Back Button */}
        <Link href="/member/songs">
          <Button
            variant="ghost"
            className="mb-4 md:mb-6 text-white hover:text-main"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
        </Link>

        {/* Main Card */}
        <Card
          className="bg-white border-emerald-100/20 shadow-lg"
          onClick={() => {
            console.log(song)
          }}
        >
          <CardHeader className="pb-4 md:pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {song.title}
            </CardTitle>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              {song.artist}
            </p>
            <SingerBadges
              singers={song.leads}
              icon={Users2}
              label="Leads"
              iconColor="text-blue-600"
              labelColor="text-blue-600"
              badgeBgColor="bg-blue-500/20"
              badgeHoverColor="hover:bg-blue-500/30"
              badgeTextColor="text-blue-800"
            />
            <SingerBadges
              singers={song.choirs}
              icon={Heart}
              label="Chœur"
              iconColor="text-red-600"
              labelColor="text-red-600"
              badgeBgColor="bg-red-500/20"
              badgeHoverColor="hover:bg-red-500/30"
              badgeTextColor="text-red-800"
            />
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Main Song Section */}
              <section className="space-y-6 w-1/2">
                <SongSection
                  songAudio={getSongAudio(SongAudioType.INSTRUMENTAL)}
                  isPlaying={
                    playingSong?.type === SongAudioType.INSTRUMENTAL &&
                    playingSong.isPlaying
                  }
                  onPlayPause={() =>
                    handlePlaySong(getSongAudio(SongAudioType.INSTRUMENTAL))
                  }
                  label="Écouter - Lead"
                />

                {/* Lead Lyrics */}
                {song.lyrics_html?.__html && (
                  <>
                    <LyricsSection
                      lyricsHtml={song.lyrics_html}
                      lyricsUrl={song.lyrics_url}
                      label="Paroles - Lead"
                      downloadLabel="Télécharger paroles"
                    />
                  </>
                )}
              </section>

              {/* Choir Song Section */}
              <section className="space-y-6 w-1/2">
                <SongSection
                  songAudio={getSongAudio(SongAudioType.CHOIR_ALTO)}
                  isPlaying={
                    playingSong?.type === SongAudioType.CHOIR_ALTO &&
                    playingSong.isPlaying
                  }
                  onPlayPause={() =>
                    handlePlaySong(getSongAudio(SongAudioType.CHOIR_ALTO))
                  }
                  label="Écouter - Chœur Alto"
                />

                <SongSection
                  songAudio={getSongAudio(SongAudioType.CHOIR_SOPRANES)}
                  isPlaying={
                    playingSong?.type === SongAudioType.CHOIR_SOPRANES &&
                    playingSong.isPlaying
                  }
                  onPlayPause={() =>
                    handlePlaySong(getSongAudio(SongAudioType.CHOIR_SOPRANES))
                  }
                  label="Écouter - Chœur Sopranes"
                />

                {song.lyrics_html_choir?.__html && (
                  <>
                    <LyricsSection
                      lyricsHtml={song.lyrics_html_choir}
                      lyricsUrl={song.lyrics_url_choir}
                      label="Paroles - Chœur"
                      downloadLabel="Télécharger paroles"
                    />
                  </>
                )}
              </section>
            </div>

            <Separator />

            {/* Video Player */}
            {song.video_url && (
              <VideoPlayer videoUrl={song.video_url} title={song.title} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SongSection({
  songAudio,
  isPlaying,
  onPlayPause,
  label,
}: {
  songAudio?: SongAudio
  isPlaying: boolean
  onPlayPause: () => void
  label: string
}) {
  if (!songAudio) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Music className="h-4 w-4 text-main" />
          <span>{label}</span>
        </div>
        <DownloadButton url={songAudio.audio_url} text="Télécharger MP3" />
      </div>
      <AudioPlayer
        audio={songAudio.audio}
        isPlaying={isPlaying}
        onPlayPause={onPlayPause}
        duration={songAudio.duration}
      />
    </div>
  )
}
