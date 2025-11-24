import { getAllShowDates } from "../api/(services)/shows.service"
import ShowDateList from "@/components/shared/show-date/show-date-list"

export default async function CalendarPage() {
  const showDates = await getAllShowDates()

  console.log(`Fetched ${showDates.length} show dates`)
  console.log(showDates)

  const now = Date.now()

  const filteredShowDates = showDates.filter(
    (showDate) => new Date(showDate.date) > new Date(now)
  )

  console.log(`Filtered ${filteredShowDates.length} show dates`)
  console.log(filteredShowDates)

  return (
    <div className="min-h-screen bg-gradient-blue pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h1 className="title mb-6">Calendrier des Spectacles</h1>
          <p className="subtitle">
            Découvrez nos prochains spectacles et réservez votre place pour
            vivre une belle soirée à nos côtés
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-100/20">
          {filteredShowDates.length > 0 ? (
            <ShowDateList showDates={filteredShowDates} />
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg
                  className="mx-auto h-16 w-16 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-emerald-800 text-xl">
                Aucun spectacle n'est actuellement programmé. Revenez bientôt
                pour découvrir nos nouvelles dates !
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
