"use client"

import { ColumnDef, FilterFn } from "@tanstack/react-table"
import {
  Booking,
  UserBookingStatus,
  UserBookingStatusLabel,
} from "@/types/booking.type"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  CheckCircle,
  Loader2,
  MoreHorizontal,
  XCircle,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { formatDate } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
declare module "@tanstack/table-core" {
  interface FilterFns {
    confirmed: FilterFn<Booking>
  }
}

export const columns: ColumnDef<Booking>[] = [
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
    accessorFn: (row) => row.show_date?.show.title,
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
      const title = row.original.show_date?.show.title
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          <span>{title}</span>
        </div>
      )
    },
  },
  {
    id: "date",
    accessorFn: (row) => row.show_date?.date,
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
      const date = row.original.show_date?.date!
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          <span>{formatDate(date)}</span>
        </div>
      )
    },
  },
  {
    id: "location",
    accessorFn: (row) => row.show_date?.auditorium.name,
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
      const location = row.original.show_date?.auditorium.name
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          <a
            href={row.original.show_date?.auditorium.location_url}
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
    accessorKey: "adult_tickets",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Billets adultes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const adultTickets = row.original.adult_tickets
      return (
        <div className="pl-4 font-medium flex items-center text-center gap-2">
          <span className="pl-10">{adultTickets}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "child_tickets",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Billets enfants
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const childTickets = row.original.child_tickets
      return (
        <div className="pl-4 font-medium flex items-center text-center gap-2">
          <span className="pl-10">{childTickets}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const totalPrice = row.original.total_price
      return (
        <div className="pl-4 font-medium flex items-center text-center gap-2">
          <span className="pl-10">{totalPrice}€</span>
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.original.name
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          <span>{name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const email = row.original.email
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          <span>{email}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "cheque",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chèque
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const router = useRouter()
      const [checked, setChecked] = useState<boolean>(row.getValue("cheque"))
      const [loading, setLoading] = useState<boolean>(false)

      async function updatePaysInCheque(usesCheque: boolean): Promise<void> {
        const booking = row.original
        setLoading(true)

        try {
          await fetch(`/api/booking`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              booking: {
                ...booking,
                cheque: usesCheque,
              },
            }),
          })

          router.refresh()
          setChecked(usesCheque)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="justify-center flex items-center w-[100px]">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <Checkbox
              checked={checked}
              onCheckedChange={(checked: boolean) =>
                updatePaysInCheque(checked)
              }
            />
          )}
        </div>
      )
    },
    sortingFn: (rowA, rowB, columnId) => {
      const usesChequeA = rowA.getValue(columnId) as boolean
      const usesChequeB = rowB.getValue(columnId) as boolean

      if (!usesChequeA && usesChequeB) {
        return -1
      }

      if (usesChequeA && !usesChequeB) {
        return 1
      }

      return 0
    },
  },
  {
    accessorKey: "cash",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Espèces
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const router = useRouter()
      const [checked, setChecked] = useState<boolean>(row.getValue("cash"))
      const [loading, setLoading] = useState<boolean>(false)

      async function updatePaysInCash(usesCash: boolean): Promise<void> {
        const booking = row.original
        setLoading(true)

        try {
          await fetch(`/api/booking`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              booking: {
                ...booking,
                cash: usesCash,
              },
            }),
          })

          router.refresh()
          setChecked(usesCash)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="justify-center flex items-center w-[100px]">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <Checkbox
              checked={checked}
              onCheckedChange={(checked: boolean) => updatePaysInCash(checked)}
            />
          )}
        </div>
      )
    },
    sortingFn: (rowA, rowB, columnId) => {
      const usesCashA = rowA.getValue(columnId) as boolean
      const usesCashB = rowB.getValue(columnId) as boolean

      if (!usesCashA && usesCashB) {
        return -1
      }

      if (usesCashA && !usesCashB) {
        return 1
      }

      return 0
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Observations
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const router = useRouter()
      const [comment, setComment] = useState<string>(
        row.getValue("comment") || ""
      )
      const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
      const [loading, setLoading] = useState<boolean>(false)

      const truncatedComment =
        comment.length > 50 ? `${comment.substring(0, 50)}...` : comment

      const handleSave = async (mode: "add" | "delete" = "add") => {
        const booking = row.original

        setLoading(true)

        try {
          await fetch(`/api/booking`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              booking: {
                ...booking,
                comment: mode === "add" ? comment : "",
              },
            }),
          })

          if (mode === "delete") {
            setComment("")
          }

          router.refresh()
          setIsDialogOpen(false)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="pl-4 w-[200px] font-medium flex items-center gap-2">
          <span className="truncate">{truncatedComment || "..."}</span>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] text-gray-900">
              <DialogHeader>
                <DialogTitle>Modifier le commentaire</DialogTitle>
              </DialogHeader>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Entrez votre commentaire ici..."
                rows={5}
              />
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                <div className="w-full flex flex-col gap-1">
                  <Button onClick={() => handleSave("add")}>Enregistrer</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleSave("delete")}
                  >
                    Effacer
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    id: "confirmed",
    accessorKey: "confirmed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Confirmation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const confirmed = row.original.confirmed
      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          {confirmed ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Confirmée</span>
            </div>
          ) : (
            <div className="flex items-center text-amber-600">
              <XCircle className="h-4 w-4 mr-1" />
              <span>En attente</span>
            </div>
          )}
        </div>
      )
    },
    enableHiding: true,
    enableSorting: true,
    filterFn: "confirmed",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Statut
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.original.status
      const statusLabel = UserBookingStatusLabel[status]

      return (
        <div className="pl-4 font-medium flex items-center gap-2">
          {status === UserBookingStatus.DONE ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>{statusLabel}</span>
            </div>
          ) : status === UserBookingStatus.PENDING ? (
            <div className="flex items-center text-amber-600">
              <XCircle className="h-4 w-4 mr-1" />
              <span>{statusLabel}</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-600">
              <XCircle className="h-4 w-4 mr-1" />
              <span>{statusLabel}</span>
            </div>
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter()
      const booking = row.original

      const [loading, setLoading] = useState<boolean>(false)
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
        useState<boolean>(false)

      async function updateStatus(newStatus: UserBookingStatus): Promise<void> {
        setLoading(true)

        try {
          await fetch(`/api/booking`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              booking: {
                ...booking,
                status: newStatus,
              },
            }),
          })
          router.refresh()
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }

      if (loading) {
        return (
          <div>
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        )
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              {booking.status === UserBookingStatus.DONE && (
                <DropdownMenuItem
                  className="cursor-pointer p-2"
                  onClick={() => updateStatus(UserBookingStatus.PENDING)}
                >
                  Marquer comme "À traiter"
                </DropdownMenuItem>
              )}
              {booking.status === UserBookingStatus.PENDING && (
                <DropdownMenuItem
                  className="cursor-pointer p-2"
                  onClick={() => updateStatus(UserBookingStatus.DONE)}
                >
                  Marquer comme "Traitée"
                </DropdownMenuItem>
              )}
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
