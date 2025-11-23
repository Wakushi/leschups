export const dynamic = "force-dynamic"

import Hero from "@/components/pages/landing/hero"
import AboutSection from "@/components/pages/landing/about"
import AgendaSection from "@/components/pages/landing/agenda"
import { getAllShowDates } from "./api/(services)/shows.service"
import { BookButton } from "@/components/buttons"

export default async function Home() {
  const showDates = await getAllShowDates()

  const availableDates = showDates.filter((show) => {
    const date = new Date(show.date)
    return date.getTime() > Date.now()
  })

  return (
    <div>
      <Hero show={availableDates[0]?.show} />
      {/* <AboutSection /> */}
      {!!availableDates.length && <AgendaSection showDates={availableDates} />}
      {!!availableDates.length && <BookButton />}
    </div>
  )
}
