import Link from "next/link"
import ShowDateList from "@/components/shared/show-date/show-date-list"
import { ShowDate } from "@/types/show.type"

export default function AgendaSection({
  showDates,
}: {
  showDates: ShowDate[]
}) {
  return (
    <section className="bg-main text-white relative overflow-hidden w-auto">
      <div className="flex py-20 px-4 min-h-[100vh] justify-center items-center flex-col gap-2 md:gap-4 relative z-[1]">
        <h2 className="title mb-6">Agenda</h2>
        <ShowDateList showDates={showDates} max={2} />
        <Link href="/calendar" className="underline md:text-xl">
          Voir plus de dates
        </Link>
      </div>
    </section>
  )
}
