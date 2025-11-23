"use client"

import { Video } from "lucide-react"

interface VideoPlayerProps {
  videoUrl?: string
  title: string
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  if (!videoUrl) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Video className="h-4 w-4 text-emerald-600" />
        <span>Chorégraphie</span>
      </div>
      <div className="rounded-lg overflow-hidden border border-emerald-100 bg-black">
        <video
          src={videoUrl}
          controls
          className="w-full aspect-video"
          aria-label={`Video de chorégraphie pour ${title}`}
        >
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>
    </div>
  )
}
