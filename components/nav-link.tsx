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
  direction?: "horizontal" | "vertical"
}
export default function Navlink({
  title,
  href,
  animated = true,
  onClick,
  direction = "horizontal",
}: NavlinkProps) {
  const pathname = usePathname()

  return (
    <li
      className={clsx("lg:mr-8", { "mb-3": direction === "vertical" })}
      onClick={onClick}
    >
      <Link
        href={href}
        className={clsx(
          `font-neucha text-lg xl:text-2xl uppercase drop-shadow-2xl flex justify-between items-center`,
          {
            "underline underline-offset-10": pathname === href,
            "text-gray-900": pathname !== href && pathname.startsWith("/admin"),
            "text-main": pathname === href && pathname.startsWith("/admin"),
            "animated-underline": pathname !== href && animated,
          }
        )}
      >
        {title} <MdNavigateNext className="opacity-40 lg:hidden" />
      </Link>
    </li>
  )
}
