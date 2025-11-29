"use client"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Download, EyeIcon, FileText } from "lucide-react"
import { useState } from "react"

interface LyricsSectionProps {
  lyricsHtml?: { __html: string | TrustedHTML }
  lyricsUrl?: string
  label: string
  downloadLabel: string
}

export function LyricsSection({
  lyricsHtml,
  lyricsUrl,
  label,
  downloadLabel,
}: LyricsSectionProps) {
  if (!lyricsHtml && !lyricsUrl) return null
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 text-sm font-semibold text-gray-900">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-main" />
          <span>{label}</span>
        </div>
        {lyricsUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              window.open(lyricsUrl, "_blank")
            }}
            className="flex items-center gap-2"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="text-xs">{downloadLabel}</span>
          </Button>
        )}
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full bg-white/50 rounded-lg border border-gray-200 shadow-xs"
      >
        <AccordionItem value="lyrics" className="border-gray-200">
          <AccordionTrigger
            className="hover:no-underline hover:bg-gray-50/50 rounded-t-lg px-4 py-3 transition-colors"
            onClick={handleExpand}
          >
            <div className="flex mx-auto items-center gap-2 text-gray-800">
              <EyeIcon className="h-4 w-4 text-main" />
              <span>{isExpanded ? "Masquer paroles" : "Afficher paroles"}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {lyricsHtml && (
              <div
                className="prose prose-sm max-w-none p-4 rounded-lg border border-gray-200 text-gray-900"
                dangerouslySetInnerHTML={lyricsHtml}
              ></div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
