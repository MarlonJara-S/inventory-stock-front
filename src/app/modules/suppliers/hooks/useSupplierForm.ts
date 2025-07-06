import { useState } from 'react';
import { useCreateSupplier, useUpdateSupplier } from './useSuppliers';
import type { SupplierFormData } from '../schemas/supplier.schema';
import type { Supplier } from '../types';

interface UseSupplierFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSupplierForm = ({ onSuccess, onError }: UseSupplierFormProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: SupplierFormData) => {
    try {
      if (editingSupplier) {
        // Actualizar supplier existente
        await updateMutation.mutateAsync({
          id: editingSupplier.id,
          data,
        });
      } else {
        // Crear nuevo supplier
        await createMutation.mutateAsync(data);
      }
      
      handleClose();
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingSupplier(null);
  };

  const openCreateDialog = () => {
    setEditingSupplier(null);
    setIsOpen(true);
  };

  const openEditDialog = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsOpen(true);
  };

  return {
    // Estado
    isOpen,
    editingSupplier,
    isLoading,
    
    // Acciones
    handleSubmit,
    handleClose,
    openCreateDialog,
    openEditDialog,
    
    // Helpers
    isEditing: !!editingSupplier,
  };
};
