import { ShowDate } from "@/types/show.type"
import ShowDateCard from "./show-date-card"

export default function ShowDateList({
  showDates,
  max,
}: {
  showDates: ShowDate[]
  max?: number
}) {
  if (max) {
    showDates = showDates.slice(0, max)
  }

  return (
    <div className="flex flex-col flex-wrap lg:flex-row justify-center items-center w-full gap-4 md:gap-8 mb-4">
      {showDates.map((showDate: ShowDate) => (
        <ShowDateCard key={showDate.id} showDate={showDate} />
      ))}
    </div>
  )
}
