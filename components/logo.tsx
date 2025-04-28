"use client"
import clsx from "clsx"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Logo() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-2">
      <div className="w-[35px] h-[40px] md:w-[45px] md:h-[50px]">
        <Image
          src="/images/logo/chups_logo.png"
          alt="Chups' logo"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
          sizes="100vw"
        />
      </div>
      <div
        className={clsx(
          "font-neucha text-2xl md:text-3xl leading-none",
          pathname.startsWith("/admin") || pathname.startsWith("/member")
            ? "text-gray-900"
            : "text-white"
        )}
      >
        LES CHUP'S
      </div>
    </div>
  )
}
