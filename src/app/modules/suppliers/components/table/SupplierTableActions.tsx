import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, Button } from "@/components";
import { EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useDeactivateSupplier } from '../../hooks/useSuppliers';
import type { Supplier } from '../../types';

interface SupplierTableActionsProps {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
}

export const SupplierTableActions: React.FC<SupplierTableActionsProps> = ({ supplier, onEdit }) => {
  const deactivateMutation = useDeactivateSupplier();

  const handleEdit = () => {
    onEdit(supplier);
  };

  const handleDeactivate = async () => {
    if (window.confirm('¿Está seguro de que desea desactivar este proveedor?')) {
      try {
        await deactivateMutation.mutateAsync(supplier.id);
      } catch (error) {
        console.error('Error deactivating supplier:', error);
      }
    }
  };

  const handleView = () => {
    console.log('Ver detalles del proveedor:', supplier);
  };

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
        <DropdownMenuItem onClick={handleEdit}>
          <PencilIcon className="mr-2 h-4 w-4 text-blue-500" />
          Editar
        </DropdownMenuItem>
        {supplier.is_active && (
          <DropdownMenuItem 
            onClick={handleDeactivate}
            disabled={deactivateMutation.isPending}
          >
            <Trash2Icon className="mr-2 h-4 w-4 text-red-500" />
            Desactivar
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleView}>
          <EyeIcon className="mr-2 h-4 w-4 text-green-500" />
          Ver detalles
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
