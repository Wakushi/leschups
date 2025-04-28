"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ShowDate } from "@/types/show.type"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { formatDate } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertDialog } from "@/components/ui/alert-dialog"

export const showDateColumns: ColumnDef<ShowDate>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "title",
    accessorFn: (row) => row.show.title,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Spectacle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const title = row.original.show.title
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          <span>{title}</span>
        </div>
      )
    },
  },
  {
    id: "date",
    accessorFn: (row) => row.date,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.original.date
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          <span>{formatDate(date)}</span>
        </div>
      )
    },
  },
  {
    id: "location",
    accessorFn: (row) => row.auditorium.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const location = row.original.auditorium.name
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          <a
            href={row.original.auditorium.location_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{location}</span>
          </a>
        </div>
      )
    },
  },
  {
    id: "city",
    accessorFn: (row) => row.auditorium.city,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ville
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const city = row.original.auditorium.city
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          <span>{city}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "adult_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix adulte
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const adultPrice = row.original.adult_price
      return (
        <div className="pl-4 font-medium flex items-center text-center gap-2">
          <span className="pl-10">{adultPrice}€</span>
        </div>
      )
    },
  },
  {
    accessorKey: "child_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix enfant
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const childPrice = row.original.child_price
      return (
        <div className="pl-4 font-medium flex items-center text-center gap-2">
          <span className="pl-10">{childPrice}€</span>
        </div>
      )
    },
  },
  {
    id: "external_booking_url",
    accessorFn: (row) => row.external_booking_url,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lien externe
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const externalUrl = row.original.external_booking_url
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          {externalUrl ? (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Lien
            </a>
          ) : (
            <span>-</span>
          )}
        </div>
      )
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const showDate = row.original
  //     const router = useRouter()
  //     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  //     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  //     const [comment, setComment] = useState("")

  //     return (
  //       <div className="flex items-center justify-center">
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Ouvrir le menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuItem
  //               onClick={() => setIsEditDialogOpen(true)}
  //               className="cursor-pointer"
  //             >
  //               <Edit className="mr-2 h-4 w-4" />
  //               Modifier
  //             </DropdownMenuItem>
  //             <DropdownMenuItem
  //               onClick={() => setIsDeleteDialogOpen(true)}
  //               className="cursor-pointer text-red-600"
  //             >
  //               <Edit className="mr-2 h-4 w-4" />
  //               Supprimer
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>

  //         <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
  //           <DialogContent>
  //             <DialogHeader>
  //               <DialogTitle>Modifier la date de spectacle</DialogTitle>
  //             </DialogHeader>
  //             <div className="grid gap-4 py-4">
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <div className="text-right font-medium">Spectacle:</div>
  //                 <div className="col-span-3">{showDate.show.title}</div>
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <div className="text-right font-medium">Date:</div>
  //                 <div className="col-span-3">{formatDate(showDate.date)}</div>
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <div className="text-right font-medium">Salle:</div>
  //                 <div className="col-span-3">{showDate.auditorium.name}</div>
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <div className="text-right font-medium">Prix adulte:</div>
  //                 <div className="col-span-3">{showDate.adult_price}€</div>
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <div className="text-right font-medium">Prix enfant:</div>
  //                 <div className="col-span-3">{showDate.child_price}€</div>
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <div className="text-right font-medium">Lien externe:</div>
  //                 <div className="col-span-3">
  //                   {showDate.external_booking_url || "-"}
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="flex justify-end">
  //               <Button
  //                 variant="outline"
  //                 onClick={() => setIsEditDialogOpen(false)}
  //               >
  //                 Annuler
  //               </Button>
  //               <Button
  //                 className="ml-2"
  //                 onClick={() => {
  //                   setIsEditDialogOpen(false)
  //                   router.refresh()
  //                 }}
  //               >
  //                 Enregistrer
  //               </Button>
  //             </div>
  //           </DialogContent>
  //         </Dialog>

  //         <AlertDialog
  //           open={isDeleteDialogOpen}
  //           onOpenChange={setIsDeleteDialogOpen}
  //         >
  //           <DialogContent>
  //             <DialogHeader>
  //               <DialogTitle>Supprimer la date de spectacle</DialogTitle>
  //             </DialogHeader>
  //             <div className="grid gap-4 py-4">
  //               <p>
  //                 Êtes-vous sûr de vouloir supprimer cette date de spectacle ?
  //                 Cette action est irréversible.
  //               </p>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <div className="text-right font-medium">Spectacle:</div>
  //                 <div className="col-span-3">{showDate.show.title}</div>
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <div className="text-right font-medium">Date:</div>
  //                 <div className="col-span-3">{formatDate(showDate.date)}</div>
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <div className="text-right font-medium">Salle:</div>
  //                 <div className="col-span-3">{showDate.auditorium.name}</div>
  //               </div>
  //             </div>
  //             <div className="flex justify-end">
  //               <Button
  //                 variant="outline"
  //                 onClick={() => setIsDeleteDialogOpen(false)}
  //               >
  //                 Annuler
  //               </Button>
  //               <Button
  //                 className="ml-2 bg-red-600 hover:bg-red-700"
  //                 onClick={() => {
  //                   // Implement delete logic here
  //                   setIsDeleteDialogOpen(false)
  //                   router.refresh()
  //                 }}
  //               >
  //                 Supprimer
  //               </Button>
  //             </div>
  //           </DialogContent>
  //         </AlertDialog>
  //       </div>
  //     )
  //   },
  // },
]
