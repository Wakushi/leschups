"use client"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  FilterFn,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Booking } from "@/types/booking.type"
import ExportButton from "./excel-export-button"

interface DataTableProps<TData extends Booking, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends Booking, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [showUnconfirmed, setShowUnconfirmed] = useState(true)

  useEffect(() => {
    setColumnFilters([
      {
        id: "confirmed",
        value: showUnconfirmed,
      },
    ])
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    filterFns: {
      confirmed: ((row, columnId, filterValue) => {
        if (filterValue === true) {
          return true
        }
        return row.original.confirmed === true
      }) as FilterFn<TData>,
    },
  })

  return (
    <div className="text-gray-900">
      <h3 className="px-2 text-lg opacity-70">Filtres</h3>
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center w-full gap-2">
          <Input
            placeholder="Spectacle"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-[200px]"
          />
          <Input
            placeholder="Nom"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-[200px]"
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="show-unconfirmed"
              checked={showUnconfirmed}
              onCheckedChange={(checked) => {
                setShowUnconfirmed(checked)
                table.getColumn("confirmed")?.setFilterValue(checked)
              }}
            />
            <Label htmlFor="show-unconfirmed">
              Afficher les réservations en attente
            </Label>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          {!!data.length && (
            <ExportButton
              data={
                Object.keys(rowSelection).length > 0
                  ? (table
                      .getFilteredSelectedRowModel()
                      .rows.map((row) => row.original) as Booking[])
                  : (data as Booking[])
              }
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                Colonnes
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  if (column.id === "actions") return null
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnsLabels[column.id as keyof typeof columnsLabels] ||
                        column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="justify-center max-w-[200px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="border-t border-slate-800 flex items-center justify-end space-x-2 p-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}

// Define column labels based on the actual column IDs in columns.tsx
const columnsLabels: Record<string, string> = {
  select: "Sélection",
  title: "Spectacle",
  date: "Date",
  location: "Salle",
  adult_price: "Prix adulte",
  child_price: "Prix enfant",
  name: "Nom",
  email: "Email",
  adult_tickets: "Billets adultes",
  child_tickets: "Billets enfants",
  total_price: "Prix total",
  status: "Statut",
  payment_method: "Méthode de paiement",
}
