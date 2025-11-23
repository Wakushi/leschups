"use client"

import { useUser } from "@/providers/user-store"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaSignOutAlt } from "react-icons/fa"
import { User } from "@/types/user.type"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { RxHamburgerMenu } from "react-icons/rx"
import { Separator } from "@/components/ui/separator"
import clsx from "clsx"
import Navlink from "@/components/nav-link"
import MusicButton from "@/components/music-player"
import Logo from "../logo"
import { usePathname } from "next/navigation"

export default function Header() {
  const { user, loadingUser, logOut } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev)
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden"
  }

  function handleLogOut() {
    toggleMobileMenu()
    logOut()
  }

  return (
    <header className="p-3 flex items-center justify-between gap-2 w-full fixed  backdrop-blur-sm z-10 shadow-sm transition-all duration-300">
      {/* Logo */}
      <Link href="/">
        <Logo />
      </Link>
      {/* Navigation */}
      {!loadingUser && (
        <div className="flex items-center gap-2">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <Navigation user={user} onLogOut={logOut} />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <div className="relative z-10" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <IoMdClose size={30} />
              ) : (
                <RxHamburgerMenu size={30} />
              )}
            </div>

            {/* Mobile Menu Overlay */}
            <div
              className={clsx(
                "fixed top-0 left-0 min-w-full min-h-[100vh] bg-main flex px-8 py-20 transition-transform duration-300",
                {
                  "transform translate-x-0 opacity-100": isMobileMenuOpen,
                  "transform -translate-x-full opacity-0": !isMobileMenuOpen,
                }
              )}
            >
              <nav className="w-full">
                <ul className="flex flex-col justify-center gap-4">
                  <Navigation
                    user={user}
                    toggleMenu={toggleMobileMenu}
                    onLogOut={handleLogOut}
                    showSeparator={true}
                    animated={false}
                  />
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Navigation({
  user,
  toggleMenu,
  onLogOut,
  animated = true,
  showSeparator = false,
}: {
  toggleMenu?: () => void
  onLogOut?: () => void
  user: User | null
  showSeparator?: boolean
  animated?: boolean
}) {
  const renderNavLink = (title: string, href: string) => (
    <>
      <Navlink
        title={title}
        href={href}
        onClick={toggleMenu}
        animated={animated}
      />
      {showSeparator && <Separator />}
    </>
  )

  const renderSocialLinks = () => (
    <div className="flex items-center justify-center self-baseline mx-auto">
      <MusicButton />
      <Link
        className="drop-shadow-lg"
        href="https://www.facebook.com/p/Les-Chups-100091876850435/"
        target="_blank"
      >
        <FaFacebook className="text-2xl mr-8 cursor-pointer hover:text-tertiary" />
      </Link>
      <Link
        className="drop-shadow-lg"
        href="https://www.instagram.com/chupsles"
        target="_blank"
      >
        <FaInstagram className="text-2xl mr-8 cursor-pointer hover:text-tertiary" />
      </Link>
    </div>
  )

  switch (user?.role) {
    case "admin":
      return (
        <>
          {renderNavLink("Accueil", "/")}
          {renderNavLink("Réservations", "/admin/bookings")}
          {renderNavLink("Dates", "/admin/show-dates")}
          {renderNavLink("Documents", "/member/documents")}
          {onLogOut && <LogoutButton logOut={onLogOut} />}
        </>
      )
    case "user":
      return (
        <>
          {renderNavLink("Accueil", "/")}
          {renderNavLink("Chansons", "/member/songs")}
          {renderNavLink("Documents", "/member/documents")}
          {onLogOut && <LogoutButton logOut={onLogOut} />}
        </>
      )
    default:
      return (
        <>
          {renderNavLink("Accueil", "/")}
          {renderNavLink("Calendrier", "/calendar")}
          {renderNavLink("Spectacles", "/shows")}
          {renderNavLink("Contact", "/contact")}
          {renderNavLink("FAQ", "/faq")}
          {renderNavLink("Compte", "/login")}
          {renderSocialLinks()}
        </>
      )
  }
}

function LogoutButton({ logOut }: { logOut: () => void }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  return (
    <li
      className={clsx(
        "font-neucha text-lg xl:text-2xl uppercase drop-shadow-lg flex justify-between items-center gap-2 cursor-pointer",
        {
          "text-gray-900": isAdmin,
        }
      )}
      onClick={logOut}
    >
      <span>Déconnexion</span>
      <FaSignOutAlt />
    </li>
  )
}
