export const dynamic = "force-dynamic"
import Link from "next/link"
import { MdNavigateNext } from "react-icons/md"
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"
import { confirmBooking } from "../api/(services)/booking.service"

export default async function ConfirmBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  async function validateBooking(): Promise<{ success: boolean }> {
    const params = await searchParams

    if (!params || !params.id || !params.email) {
      return { success: false }
    }

    try {
      await confirmBooking({
        confirmationId: params.id as string,
        email: params.email as string,
      })
    } catch (error) {
      console.error(error)
      return { success: false }
    }

    return { success: true }
  }

  const result = await validateBooking()

  if (!result.success) {
    return (
      <div className="min-h-screen bg-emerald-700 pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-100/20 text-center">
            <div className="mb-8">
              <FaExclamationCircle className="mx-auto h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-3xl font-title md:text-4xl font-bold text-emerald-900 mb-4">
              Une erreur est survenue
            </h1>
            <p className="text-xl text-emerald-800 mb-8">
              Cette réservation n'existe pas ou a déjà été confirmée.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Retour à l'accueil <MdNavigateNext className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-emerald-700 pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-100/20 text-center">
          <div className="mb-8">
            <FaCheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-title md:text-4xl font-bold text-emerald-900 mb-4">
            Votre réservation est confirmée !
          </h1>
          <p className="text-xl text-emerald-800 mb-8">
            Nous avons hâte de vous retrouver, à très bientôt
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            Retour à l'accueil <MdNavigateNext className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  )
}
