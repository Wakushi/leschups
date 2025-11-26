import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  date: Date | string,
  format: "short" | "long" = "long"
): string {
  const options: Intl.DateTimeFormatOptions =
    format === "short"
      ? {
          year: "2-digit",
          month: "numeric",
          day: "numeric",
        }
      : {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
  return new Date(date).toLocaleDateString("fr-FR", options)
}

export function formatTime(date: Date | string): string {
  return new Date(date)
    .toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Paris",
    })
    .replace(":", "h")
}

export async function getAudioDuration(
  audioElement: HTMLAudioElement
): Promise<number> {
  return new Promise((resolve) => {
    audioElement.addEventListener("loadedmetadata", () => {
      const durationInMs = audioElement.duration
      resolve(durationInMs || 0)
    })
  })
}

/**
 * Converts seconds to a time string in the format "M:SS"
 * @param seconds - The number of seconds to convert
 * @returns A string in the format "M:SS" (e.g., "2:25", "10:05")
 * @example
 * secondsToMinutes(145) // returns "2:25"
 * secondsToMinutes(65)  // returns "1:05"
 * secondsToMinutes(600) // returns "10:00"
 */
export function secondsToMinutes(seconds: number): string {
  if (seconds < 0) return "0:00"

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

/**
 * Converts a time string in the format "M:SS" to seconds
 * @param timeStr - A string in the format "M:SS"
 * @returns The total number of seconds
 * @example
 * minutesToSeconds("2:25") // returns 145
 * minutesToSeconds("1:05") // returns 65
 * minutesToSeconds("10:00") // returns 600
 */
export function minutesToSeconds(timeStr: string): number {
  const [minutes, seconds] = timeStr.split(":").map(Number)
  return minutes * 60 + seconds
}
