import React from "react"
import { Funnel } from "lucide-react"
import { type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState,
    flexRender, 
    getCoreRowModel, 
    useReactTable, 
    getPaginationRowModel, 
    getSortedRowModel,  
    getFilteredRowModel,
 } from "@tanstack/react-table"

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow, 
    Button, 
    Input, 
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger, 


} from "@/components"
import { DataTablePagination } from "./DataTablePagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  createButton?: React.ReactNode // Botón de crear opcional
}

export function DataTable<TData, TValue>({
  columns,
  data,
  createButton,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
    },
  })
 
  return (
    <>
    <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
            <Input
            placeholder="Buscar..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="ml-auto">
                    <Funnel className="h-4 w-4" />
                    <span className="sr-only">Columns</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
                .getAllColumns()
                .filter(
                    (column) => column.getCanHide()
                )
                .map((column) => {
                    return (
                    <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                        }
                    >
                        {column.id}
                    </DropdownMenuCheckboxItem>
                    )
                })}
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
        {/* Botón de crear si se proporciona */}
        {createButton && (
            <div className="ml-auto">
                {createButton}
            </div>
        )}
        
      </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
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
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resuldados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-between space-x-2 py-4">
        <DataTablePagination table={table} />     
    </div>
    </>
  )
}