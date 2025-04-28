import React from "react"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import { Button } from "@/components/ui/button"
import { PiMicrosoftExcelLogoFill } from "react-icons/pi"
import { Booking } from "@/types/booking.type"

interface ExportButtonProps {
  data: Booking[]
}

export default function ExportButton({ data }: ExportButtonProps) {
  function exportToExcel() {
    const exportData = data.map((booking) => ({
      Prénom: booking.first_name,
      Nom: booking.name,
      Email: booking.email,
      "Billets adulte": booking.adult_tickets,
      "Billets enfant": booking.child_tickets,
      "Prix total": booking.total_price,
      Espèces: booking.cash ? "x" : "",
      Chèque: booking.cheque ? "x" : "",
      Commentaire: booking.comment,
      Spectacle: booking.show_date?.show.title,
      Ville: booking.show_date?.auditorium.city,
      Date: booking.show_date?.date,
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Réservations")

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    })

    const excelData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    const today = new Date()

    const formattedDate = today
      .toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")
    const filename = `reservations-${formattedDate}.xlsx`

    saveAs(excelData, filename)
  }

  return (
    <Button
      className="w-full bg-transparent border border-green-700 text-green-700 hover:bg-green-700 hover:text-white flex items-center gap-1 group"
      onClick={exportToExcel}
    >
      Exporter
      <PiMicrosoftExcelLogoFill className="text-xl text-green-700 group-hover:text-white" />
    </Button>
  )
}
