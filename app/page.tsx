export const dynamic = "force-dynamic"

import Hero from "@/components/pages/landing/hero"
import AboutSection from "@/components/pages/landing/about"
import AgendaSection from "@/components/pages/landing/agenda"
import { getAllShowDates } from "./api/(services)/shows.service"
import { BookButton } from "@/components/buttons"

export default async function Home() {
  const showDates = await getAllShowDates()

  console.log(showDates)

  return (
    <div>
      <Hero show={showDates[0].show} />
      <AboutSection />
      {!!showDates.length && <AgendaSection showDates={showDates} />}
      {!!showDates.length && <BookButton />}
    </div>
  )
}
