"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ShowDate } from "@/types/show.type"
import { formatTime } from "@/lib/utils"
import { formatDate } from "@/lib/utils"
import BookingForm from "./booking-form"
import ShowPoster from "../poster"
import clsx from "clsx"
import { FiCalendar, FiMapPin, FiUser } from "react-icons/fi"
import { FaCalendarCheck } from "react-icons/fa"

interface BookingModalProps {
  showDate: ShowDate
  heroView?: boolean
}

export default function BookingModal({
  showDate,
  heroView,
}: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const DialogContentElement = () => {
    if (isSubmitting) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
          <p className="mt-4 text-xl text-gray-600">
            Envoi de votre réservation...
          </p>
        </div>
      )
    }

    if (isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center gap-6 p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Merci pour votre réservation !
          </h2>
          <p className="text-base text-gray-700">
            Un email de confirmation vous a été envoyé.
          </p>
          <p className="text-base text-gray-700">
            Veuillez cliquer sur le lien dans l'email afin de finaliser votre
            réservation.
          </p>
          <p className="text-sm text-gray-500">
            (Pensez à vérifier votre dossier spam si vous ne trouvez pas
            l'email.)
          </p>
        </div>
      )
    }

    const { show, auditorium, date, adult_price, child_price, time } = showDate
    const { name, city } = auditorium

    return (
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
        <div className="md:w-1/3 w-full">
          <div className="sticky top-4">
            <ShowPoster title={show.title} image={show.image} />

            <div className="mt-6 bg-amber-100/70 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {show.title}
              </h2>

              <div className="flex items-center gap-2 text-amber-700 mb-3">
                <FiCalendar className="w-5 h-5" />
                <p className="text-sm font-medium">
                  {formatDate(date)} • {time || formatTime(date)}
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <FiMapPin className="w-5 h-5" />
                <div className="text-sm">
                  <p className="font-semibold">{name}</p>
                  <p className="text-gray-600">{city}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700 mt-3">
                <FiUser className="w-5 h-5" />
                <p className="text-sm">
                  <span className="font-semibold">Tarif adulte :</span>{" "}
                  {adult_price} €
                  {!!child_price && (
                    <>
                      <br />
                      <span className="font-semibold">Tarif enfant :</span>{" "}
                      {child_price} €
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 w-full">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Réservation
            </h3>

            <div className="bg-amber-50 p-4 rounded-lg mb-6 space-y-2 border border-amber-100">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Note importante:</span> Le
                paiement des billets se fera sur place le jour du spectacle.
              </p>
              {!!child_price && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Tarif enfant:</span>{" "}
                  Applicable pour les enfants de moins de 12 ans.
                </p>
              )}
            </div>

            <BookingForm
              showDate={showDate}
              setIsSuccess={setIsSuccess}
              setIsSubmitting={setIsSubmitting}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog
      onOpenChange={() => {
        setIsSuccess(false)
        setIsSubmitting(false)
      }}
    >
      <DialogTrigger asChild>
        <Button
          className={clsx(
            "md:w-full flex-1 bg-amber-500 text-white hover:bg-amber-600",
            {
              "text-white border border-white min-h-[40px] max-h-[40px] w-[110px] max-w-[200px] mx-auto uppercase font-bold":
                heroView,
            }
          )}
        >
          Réserver
          <FaCalendarCheck className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogTitle className="sr-only">Réservation</DialogTitle>
      <DialogContent
        className={clsx(
          "h-[100dvh] max-w-[900px] md:max-h-[80%] rounded overflow-auto p-4",
          {
            "md:max-h-[400px]": isSuccess,
          }
        )}
      >
        <DialogContentElement />
      </DialogContent>
    </Dialog>
  )
}
