import { type ColumnDef } from "@tanstack/react-table"
import { type Supplier } from "../../types";
import { CircleCheckBig, CircleX } from "lucide-react";
import { Checkbox, Badge } from "@/components"
import { SupplierTableActions } from "./SupplierTableActions";

interface ColumnConfig {
  onEdit: (supplier: Supplier) => void;
}

export const createSupplierColumns = ({ onEdit }: ColumnConfig): ColumnDef<Supplier>[] => [
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
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return <div className="text-blue-500">{email}</div>
        }
    },
    {
        accessorKey: "phone",
        header: "Teléfono",
        cell: ({ row }) => {
            const phone = row.getValue("phone") as string;
            return <div className="text-blue-500">{phone}</div>
        }
    },
    {
        accessorKey: "address",
        header: "Dirección",
    },
    {
        accessorKey: "is_active",
        header: "Estado",
        cell: ({ row }) => {
            return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.is_active === true ? (
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
            </Badge>
            );
        }
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            return (
                <SupplierTableActions 
                    supplier={row.original} 
                    onEdit={onEdit}
                />
            )
        },
    },

]