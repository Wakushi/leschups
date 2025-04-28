import { getAllShowDates } from "@/app/api/(services)/shows.service"
import { showDateColumns } from "@/components/pages/admin/show-date-columns"
import { ShowDateDataTable } from "@/components/pages/admin/show-date-data-table"
export const dynamic = "force-dynamic"

export default async function ShowDatesPage() {
  const showDates = await getAllShowDates()

  return (
    <div className="py-20 px-4 text-gray-900">
      <h1 className={`text-3xl mb-6 py-2`}>Dates de spectacles</h1>
      <ShowDateDataTable columns={showDateColumns} data={showDates} />
    </div>
  )
}
