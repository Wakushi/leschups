import { fetchBookings } from "@/app/api/(services)/booking.service"
import { columns } from "@/components/pages/admin/columns"
import { DataTable } from "@/components/pages/admin/data-table"
export const dynamic = "force-dynamic"

export default async function BookingsPage() {
  const bookings = await fetchBookings()

  return (
    <div className="py-20 px-4 text-gray-900">
      <h1 className={`text-3xl mb-6 py-2`}>Représentations</h1>
      <DataTable columns={columns} data={bookings} />
    </div>
  )
}
