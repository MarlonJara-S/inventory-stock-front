import { ArrowUpDown, CircleCheckBig, CircleX } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox, Button, Badge } from "@/components"
import type { Product } from "../types/products.types";
import { DataTableActions } from "@/app/shared/components/table/DataTableActions";

export const columns: ColumnDef<Product>[] = [
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
        accessorKey: "id",
        header: "#",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="hover:bg-black/5" >
                    Precio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);
            return <div className="">{formattedPrice}</div>
        } 
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "description",
        header: "Descripción",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.status === true ? (
                    <>
                        <CircleCheckBig className="fill-green-500 text-white dark:fill-green-400" />
                        Activo
                    </>
                ) : (
                    <>
                        <CircleX className="fill-red-600 text-white dark:fill-red-400" />
                        Inactivo
                    </>
                )}
                {row.original.status}
            </Badge>
            );
        },
    },
    {
        accessorKey: "category",
        header: "Categoría",
        cell: ({ row }) => {
            const category = row.original.category;
            return <span>{category.name}</span>;
        },
    },

    {
        id: "actions",
        header: "Acciones",
        cell: () => {
            return (
                <DataTableActions />
            )
        },
    },

]