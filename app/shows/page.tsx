import { getAllShows } from "../api/(services)/shows.service"
import ShowCard from "@/components/shared/show/show-card"

export default async function ShowsPage() {
  const shows = await getAllShows()

  return (
    <div className="min-h-screen bg-main pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h1 className="title mb-6">Nos Spectacles</h1>
          <p className="subtitle">
            Découvrez l'ensemble de nos spectacles passés et à venir
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-100/20">
          {shows.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-emerald-800 text-xl">
                Aucun spectacle n'est disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
