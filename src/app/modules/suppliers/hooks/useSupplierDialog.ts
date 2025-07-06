import { useCreateSupplier, useUpdateSupplier } from './useSuppliers';
import type { SupplierFormData } from '../schemas/supplier.schema';
import type { Supplier } from '../types';

interface UseSupplierDialogProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSupplierDialog = ({ onSuccess, onError }: UseSupplierDialogProps = {}) => {
  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();

  const handleFormSubmit = async (data: SupplierFormData, editingSupplier?: Supplier | null) => {
    try {
      if (editingSupplier) {
        await updateMutation.mutateAsync({
          id: editingSupplier.id,
          data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
      throw error;
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return {
    handleFormSubmit,
    isLoading,
  };
};
