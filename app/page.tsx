import Hero from "@/components/pages/landing/hero"
import AboutSection from "@/components/pages/landing/about"
import AgendaSection from "@/components/pages/landing/agenda"
import { getAllShowDates } from "./api/(services)/shows.service"
import { BookButton } from "@/components/buttons"
export default async function Home() {
  const nextShow = {
    title: "Bonheur en famille",
    image: "https://i.imgur.com/HAk8Z32.jpeg",
  }

  const showDates = await getAllShowDates()

  return (
    <div>
      <Hero show={nextShow} />
      <AboutSection />
      {!!showDates.length && <AgendaSection showDates={showDates} />}
      {!!showDates.length && <BookButton />}
    </div>
  )
}
