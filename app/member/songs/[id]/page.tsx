import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Music } from "lucide-react"
import { SIMPLE_SONGS } from "@/lib/data/songs"

export default async function SongDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const song = SIMPLE_SONGS.find((s) => s.id === id)

  if (!song) {
    return (
      <div className="min-h-screen pt-20 bg-main relative">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link href="/member/songs">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste
            </Button>
          </Link>

          <Card className="bg-white border-emerald-100/20 shadow-md">
            <CardContent className="py-12 text-center">
              <Music className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Cette chanson n'existe pas
              </CardTitle>
              <p className="text-gray-600 mb-6">
                La chanson que vous recherchez n'a pas été trouvée.
              </p>
              <Link href="/member/songs">
                <Button>Retour à la liste des chansons</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-main relative">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/member/songs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
        </Link>

        <Card className="bg-white border-emerald-100/20 shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900">
              {song.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Artiste
              </h3>
              <p className="text-lg text-gray-900">{song.artist}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Chanteurs ({song.singers.length})
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {song.singers.map((singer, index) => (
                  <li key={index} className="text-gray-700">
                    {singer}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
