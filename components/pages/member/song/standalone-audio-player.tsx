"use client"

import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { secondsToMinutes } from "@/lib/utils"
import { FaPause, FaPlay } from "react-icons/fa"
import { Music } from "lucide-react"

interface StandaloneAudioPlayerProps {
  audioUrl: string
  label?: string
}

export function StandaloneAudioPlayer({
  audioUrl,
  label,
}: StandaloneAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isSeekingRef = useRef(false)

  useEffect(() => {
    if (!audioUrl) return

    const audio = new Audio(audioUrl)
    audioRef.current = audio

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      if (!isSeekingRef.current) {
        setCurrentTime(audio.currentTime)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
      audio.src = ""
    }
  }, [audioUrl])

  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSliderChange = (value: number[]) => {
    if (!audioRef.current) return
    isSeekingRef.current = true
    audioRef.current.currentTime = value[0]
    setCurrentTime(value[0])
    setTimeout(() => {
      isSeekingRef.current = false
    }, 100)
  }

  if (!audioUrl) return null

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Music className="h-4 w-4 text-emerald-600" />
          <span>{label}</span>
        </div>
      )}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
        <button
          onClick={handlePlayPause}
          className="h-10 w-10 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center transition-colors flex-shrink-0"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <FaPause className="text-white text-sm" />
          ) : (
            <FaPlay className="text-white text-sm ml-0.5" />
          )}
        </button>
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            className="w-full"
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{secondsToMinutes(currentTime)}</span>
            <span>{secondsToMinutes(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
