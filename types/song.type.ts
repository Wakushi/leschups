export type Song = {
  id: number
  title: string
  artist: string
  leads: string[]
  choirs: string[]
  duration: number
  part: 1 | 2
  lyrics_url: string
  isFavorite: boolean
  isPlaying?: boolean
  lyrics_html?: { __html: string | TrustedHTML }
  lyrics_html_choir?: { __html: string | TrustedHTML }
  lyrics_url_choir?: string
  audio_url: string
  audio?: HTMLAudioElement
  audio_url_choir_alto?: string
  audio_choir_alto?: HTMLAudioElement
  audio_url_choir_sopranes?: string
  audio_choir_sopranes?: HTMLAudioElement
  video_url?: string
}

export type SimpleSong = {
  id: string
  title: string
  artist: string
  singers: string[]
}
