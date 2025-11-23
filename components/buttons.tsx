import Link from "next/link"
import { FaCalendarCheck } from "react-icons/fa"

function BookButton() {
  return (
    <Link
      href="/calendar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-tertiary hover:bg-tertiary-dark text-white font-bold text-lg lg:text-xl px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 z-[2]"
    >
      <FaCalendarCheck />
      <span className="drop-shadow text-nowrap">Réserver maintenant</span>
    </Link>
  )
}

export { BookButton }
