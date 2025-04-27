import { playfairDisplay } from "../layout"
import { getAllShowDates } from "../api/(services)/shows.service"
import ShowDateList from "@/components/shared/show-date/show-date-list"

export default async function CalendarPage() {
  const showDates = await getAllShowDates()

  const now = Date.now()

  const formattedShowDates = showDates.filter(
    (showDate) => new Date(showDate.date) > new Date(now)
  )

  return (
    <div className="py-20 md:py-[8rem] px-4">
      <div className="mb-6 md:mb-12 md:p-[1rem]">
        <h1
          className={`${playfairDisplay.className} text-3xl md:text-[3rem] md:mb-2`}
        >
          Agenda
        </h1>
        <p
          className={`${playfairDisplay.className} text-xl md:text-2xl bg-gradient-to-t from-[#a7a7a7] via-white to-white bg-clip-text font-display tracking-tight text-transparent`}
        >
          Découvrez toutes nos dates
        </p>
      </div>
      {formattedShowDates.length ? (
        <ShowDateList showDates={formattedShowDates} />
      ) : (
        <p className="md:pl-4">Aucune date n'est disponible pour le moment.</p>
      )}
    </div>
  )
}
