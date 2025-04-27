import Link from "next/link"
import { FaCalendarCheck } from "react-icons/fa"
import { IoIosLogOut } from "react-icons/io"

function BookButton() {
  return (
    <Link
      href="/calendar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg lg:text-xl px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 z-[99]"
    >
      <FaCalendarCheck />
      <span className="drop-shadow text-nowrap">Réserver maintenant</span>
    </Link>
  )
}

function LogoutButton({ logOut }: { logOut: () => void }) {
  return (
    <li
      className={`font-neucha text-lg xl:text-xl uppercase drop-shadow-lg flex justify-between items-center gap-2 cursor-pointer`}
      onClick={logOut}
    >
      <span>Déconnexion</span>
      <IoIosLogOut className="opacity-40" />
    </li>
  )
}

export { BookButton, LogoutButton }
