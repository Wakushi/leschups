"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { MdNavigateNext } from "react-icons/md"

interface NavlinkProps {
  title: string
  href: string
  animated?: boolean
  onClick?: () => void
}
export default function Navlink({
  title,
  href,
  animated = true,
  onClick,
}: NavlinkProps) {
  const pathname = usePathname()

  return (
    <li className="lg:mr-8" onClick={onClick}>
      <Link
        href={href}
        className={clsx(
          `font-neucha text-lg xl:text-2xl uppercase drop-shadow-2xl flex justify-between items-center`,
          {
            "text-amber-400": pathname === href,
            "animated-underline": animated,
          }
        )}
      >
        {title} <MdNavigateNext className="opacity-40 lg:hidden" />
      </Link>
    </li>
  )
}
