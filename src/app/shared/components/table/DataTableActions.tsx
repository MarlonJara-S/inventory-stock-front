import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, Button, } from "@/components"
import { EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'
export const DataTableActions = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Abrir menu</span>
        <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem>
        <PencilIcon className="mr-2 h-4 w-4 text-blue-500" />
        Editar
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Trash2Icon className="mr-2 h-4 w-4 text-red-500" />
        Eliminar
        </DropdownMenuItem>
        <DropdownMenuItem>
        <EyeIcon className="mr-2 h-4 w-4 text-green-500" />
        Visualizar
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
