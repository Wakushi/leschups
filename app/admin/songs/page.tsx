import { getAllSongs } from "@/app/api/(services)/songs.service"
import { SongDataTable } from "@/components/pages/admin/song-data-table"
import { songColumns } from "@/components/pages/admin/song-columns"
import { SongFormModal } from "@/components/pages/admin/song-form-modal"

export const dynamic = "force-dynamic"

export default async function AdminSongsPage() {
  const songs = await getAllSongs()

  return (
    <div className="py-20 px-4 text-gray-900 flex flex-col gap-6">
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl py-2">Chansons</h1>
          <SongFormModal />
        </div>
        <SongDataTable columns={songColumns} data={songs} />
      </div>
    </div>
  )
}
