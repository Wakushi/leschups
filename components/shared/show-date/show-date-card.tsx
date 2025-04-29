import { Card } from "@/components/ui/card"
import ShowPoster from "../poster"
import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import { ShowDate } from "@/types/show.type"
import { formatDate, formatTime } from "@/lib/utils"
import ShowDateAccess from "./show-date-access"
import { Button } from "@/components/ui/button"
import BookingModal from "../booking/booking-modal"

export default function ShowDateCard({ showDate }: { showDate: ShowDate }) {
  const { show, auditorium, date, external_booking_url, time } = showDate
  const { name, city, location_url } = auditorium

  return (
    <Card className="p-3 md:p-6 bg-gradient-to-br from-amber-50 to-amber-100/80 text-gray-800 border-none rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-[320px] md:max-w-[580px]">
      <div className="flex flex-col md:flex-row md:gap-6">
        <div className="w-full md:w-auto mb-4 md:mb-0 flex justify-center items-center">
          <ShowPoster title={show.title} image={show.image} />
        </div>

        <div className="flex flex-col flex-1 space-y-3 md:space-y-4">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight mb-1 md:mb-2 line-clamp-2">
              {show.title}
            </h2>
            <div className="flex items-center text-amber-600 mb-2 md:mb-3">
              <p className="text-sm md:text-lg font-medium">
                {formatDate(date)} • {time || formatTime(date)}
              </p>
            </div>
            <div className="space-y-0.5 md:space-y-1">
              <p className="text-sm md:text-lg font-semibold">{name}</p>
              <p className="text-sm md:text-lg text-gray-600">{city}</p>
            </div>
          </div>

          <div className="flex gap-2 md:flex-col md:gap-3 mt-auto pt-2">
            <ShowDateAccess locationUrl={location_url} />
            {external_booking_url ? (
              <Button
                variant="default"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-sm md:text-base h-9 md:h-10"
              >
                <Link
                  href={external_booking_url}
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full"
                >
                  Réserver
                  <FaExternalLinkAlt className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </Button>
            ) : (
              <BookingModal showDate={showDate} />
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
