import Link from "next/link"
import ShowDateList from "@/components/shared/show-date/show-date-list"
import { ShowDate } from "@/types/show.type"
import Image from "next/image"

export default function AgendaSection({
  showDates,
}: {
  showDates: ShowDate[]
}) {
  return (
    <section className="bg-gradient-blue text-white relative overflow-hidden w-auto">
      <div className="absolute top-0 left-0 w-full h-full bg-white/[0.01] backdrop-blur-sm z-[1]"></div>
      <div className="flex py-20 px-4 min-h-[100vh] justify-center items-center flex-col gap-2 md:gap-4 relative z-[2]">
        <h2 className="title mb-6">Agenda</h2>
        <ShowDateList showDates={showDates} max={2} />
        <Link
          href="/calendar"
          className="underline md:text-xl text-shadow-lg z-[2]"
        >
          Voir plus de dates
        </Link>
      </div>
      <div className="w-[800px] absolute left-[-350px] bottom-[-50%]">
        <Image
          src="/images/background/pine.png"
          alt="Pine"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="tree-sway"
        />
      </div>
      <div className="w-[800px] absolute right-[-400px] bottom-[-30%]">
        <Image
          src="/images/background/pine.png"
          alt="Pine"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="tree-sway"
        />
      </div>
    </section>
  )
}
