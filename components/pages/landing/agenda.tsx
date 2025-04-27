import Link from "next/link"
import Image from "next/image"
import ShowDateList from "@/components/shared/show-date/show-date-list"
import { ShowDate } from "@/types/show.type"

export default function AgendaSection({
  showDates,
}: {
  showDates: ShowDate[]
}) {
  return (
    <section className="bg-emerald-900 text-white relative overflow-hidden w-auto">
      <div className="flex py-20 px-4 min-h-[100vh] justify-center items-center flex-col gap-2 md:gap-4 relative z-[1]">
        <h2 className="title mb-6">Agenda</h2>
        <ShowDateList showDates={showDates} max={2} />
        <Link href="/calendar" className="underline md:text-xl">
          Voir plus de dates
        </Link>
      </div>
      <div className="w-[800px] absolute left-[-250px] bottom-[-5%]">
        <Image
          src="/images/flowers-left.webp"
          alt="Flower"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="w-[800px] absolute right-[-250px] bottom-[-5%]">
        <Image
          src="/images/flowers-right.webp"
          alt="Flower"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </section>
  )
}
