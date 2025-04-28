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
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { ShowDate } from "@/types/show.type"

interface ShowDateDataTableProps<TData extends ShowDate, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ShowDateDataTable<TData extends ShowDate, TValue>({
  columns,
  data,
}: ShowDateDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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
      confirmed: (row, columnId, filterValue) => {
        const date = row.original[columnId]
        return date.isAfter(filterValue)
      },
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
            placeholder="Salle"
            value={
              (table.getColumn("location")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("location")?.setFilterValue(event.target.value)
            }
            className="max-w-[200px]"
          />
          <Input
            placeholder="Ville"
            value={(table.getColumn("city")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("city")?.setFilterValue(event.target.value)
            }
            className="max-w-[200px]"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
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

const columnsLabels: Record<string, string> = {
  select: "Sélection",
  title: "Spectacle",
  date: "Date",
  location: "Salle",
  city: "Ville",
  adult_price: "Prix adulte",
  child_price: "Prix enfant",
  external_booking_url: "Lien externe",
}
