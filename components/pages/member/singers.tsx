import { Badge } from "@/components/ui/badge"

interface SongSingersProps {
  singers: string[]
}

export function SongSingers({ singers }: SongSingersProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {singers.map((singer) => (
        <Badge
          key={singer}
          variant="secondary"
          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-800"
        >
          {singer}
        </Badge>
      ))}
    </div>
  )
}
