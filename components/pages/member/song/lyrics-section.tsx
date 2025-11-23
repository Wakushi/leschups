"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

interface LyricsSectionProps {
  lyricsHtml?: { __html: string | TrustedHTML }
  lyricsUrl?: string
  title: string
  label: string
  downloadLabel: string
}

export function LyricsSection({
  lyricsHtml,
  lyricsUrl,
  title,
  label,
  downloadLabel,
}: LyricsSectionProps) {
  if (!lyricsHtml && !lyricsUrl) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <FileText className="h-4 w-4 text-emerald-600" />
          <span>{label}</span>
        </div>
        {lyricsUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(lyricsUrl, "_blank")}
            className="flex items-center gap-2"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="text-xs">{downloadLabel}</span>
          </Button>
        )}
      </div>
      {lyricsHtml && (
        <div
          className="prose prose-sm max-w-none p-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900"
          dangerouslySetInnerHTML={lyricsHtml}
        />
      )}
    </div>
  )
}
