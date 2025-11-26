import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { secondsToMinutes } from "@/lib/utils"
import { FaPause, FaPlay } from "react-icons/fa"

interface AudioPlayerProps {
  isPlaying: boolean
  onPlayPause: () => void
  duration: number
  audio: HTMLAudioElement | undefined
}

export function AudioPlayer({
  isPlaying,
  onPlayPause,
  duration,
  audio,
}: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const isSeekingRef = useRef(false)
  const seekTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!audio) return

    const handleTimeUpdate = () => {
      if (isSeekingRef.current) {
        return
      }
      setCurrentTime(audio.currentTime)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [audio, currentTime, duration])

  const handleSliderChange = (value: number[]) => {
    if (!audio) return

    const targetTime = value[0]

    let seekableStart = 0
    let seekableEnd = audio.duration || duration

    if (audio.seekable.length > 0) {
      seekableStart = audio.seekable.start(0)
      seekableEnd = audio.seekable.end(0)

      if (seekableStart === 0 && seekableEnd === 0 && audio.duration > 0) {
        seekableEnd = audio.duration
      }
    }

    const clampedTime = Math.max(
      seekableStart,
      Math.min(targetTime, seekableEnd)
    )

    isSeekingRef.current = false
    isSeekingRef.current = true

    try {
      audio.currentTime = clampedTime
      setCurrentTime(clampedTime)

      setTimeout(() => {
        isSeekingRef.current = false
        if (Math.abs(audio.currentTime - clampedTime) < 1) {
          setCurrentTime(audio.currentTime)
        }
      }, 5)
    } catch (error) {
      isSeekingRef.current = false
    }
  }

  return (
    <div className="flex items-center gap-4 p-2 px-4 rounded-lg bg-main shadow-lg min-w-[200px] md:min-w-[300px]">
      <button
        onClick={onPlayPause}
        className="h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
      >
        {isPlaying ? (
          <FaPause className="text-white" />
        ) : (
          <FaPlay className="text-white ml-1" />
        )}
      </button>
      <div className="flex-1 flex flex-col gap-[5px] mt-2">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          className="w-full"
          onValueChange={(value) => {
            setCurrentTime(value[0])

            if (seekTimeoutRef.current) {
              clearTimeout(seekTimeoutRef.current)
            }

            seekTimeoutRef.current = setTimeout(() => {
              handleSliderChange(value)
            }, 80)
          }}
          onValueCommit={(value) => {
            if (seekTimeoutRef.current) {
              clearTimeout(seekTimeoutRef.current)
              seekTimeoutRef.current = null
            }
            isSeekingRef.current = false
            handleSliderChange(value)
          }}
        />
        <div className="flex justify-between text-xs text-white mt-1">
          <span>{secondsToMinutes(currentTime)}</span>
          <span>{secondsToMinutes(duration)}</span>
        </div>
      </div>
    </div>
  )
}
