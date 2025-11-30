export const dynamic = "force-dynamic"

import Hero from "@/components/pages/landing/hero"
import AboutSection from "@/components/pages/landing/about"
import AgendaSection from "@/components/pages/landing/agenda"
import { getAllShowDates } from "./api/(services)/shows.service"
import { BookButton } from "@/components/buttons"
import Snow from "@/components/ui/snow"

export default async function Home() {
  const showDates = await getAllShowDates()

  const availableDates = showDates.filter((show) => {
    const date = new Date(show.date)
    return date.getTime() > Date.now()
  })

  return (
    <div>
      <Snow />
      <Hero show={availableDates[0]?.show} />
      {!!availableDates.length && <AgendaSection showDates={availableDates} />}
      <AboutSection />
      {!!availableDates.length && <BookButton />}
    </div>
  )
}
