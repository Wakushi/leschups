import { Button } from "./button"
import { Download } from "lucide-react"

export default function DownloadButton({
  url,
  text,
}: {
  url: string
  text: string
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.open(url, "_blank")}
      className="flex items-center gap-2"
    >
      <Download className="h-3.5 w-3.5" />
      <span className="text-xs">{text}</span>
    </Button>
  )
}
