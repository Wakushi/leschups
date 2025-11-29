export enum SongAudioType {
  INSTRUMENTAL = "instrumental",
  CHOIR_ALTO = "choir_alto",
  CHOIR_SOPRANES = "choir_sopranes",
}

export type Song = {
  id: number
  title: string
  artist: string
  leads: string[]
  choirs: string[]
  lyrics_url?: string // To download as docx/pdf
  lyrics_html?: { __html: string | TrustedHTML } // Visualize in the app
  lyrics_url_choir?: string
  lyrics_html_choir?: { __html: string | TrustedHTML }
  audio_url?: string
  audio_url_choir_alto?: string
  audio_url_choir_sopranes?: string
  video_url?: string
}

export type SongAudio = {
  audio: HTMLAudioElement
  audio_url: string
  duration: number
  isPlaying: boolean
  type: SongAudioType
}
