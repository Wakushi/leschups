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
    })
    .replace(":", "h")
}
