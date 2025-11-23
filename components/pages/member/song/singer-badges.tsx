import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface SingerBadgesProps {
  singers: string[]
  icon: LucideIcon
  label: string
  iconColor: string
  labelColor: string
  badgeBgColor: string
  badgeHoverColor: string
  badgeTextColor: string
}

export function SingerBadges({
  singers,
  icon: Icon,
  label,
  iconColor,
  labelColor,
  badgeBgColor,
  badgeHoverColor,
  badgeTextColor,
}: SingerBadgesProps) {
  if (!singers || singers.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        <span className={labelColor}>{label}</span>
      </div>
      {singers.map((singer, index) => (
        <Badge
          key={index}
          variant="secondary"
          className={`${badgeBgColor} ${badgeHoverColor} ${badgeTextColor}`}
        >
          {singer}
        </Badge>
      ))}
    </div>
  )
}
