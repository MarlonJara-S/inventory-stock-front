import { useState, useCallback } from 'react';
import type { UseFormReturn, FieldValues } from 'react-hook-form';

interface UseFormDialogProps<T extends FieldValues = FieldValues> {
  onSubmit: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  resetOnClose?: boolean;
}

export const useFormDialog = <T extends FieldValues = FieldValues>({
  onSubmit,
  onSuccess,
  onError,
  resetOnClose = true,
}: UseFormDialogProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const handleSubmit = useCallback(
    async (data: T, form?: UseFormReturn<T>) => {
      setIsLoading(true);
      try {
        await onSubmit(data);
        handleClose();
        onSuccess?.();
        
        // Reset form if provided
        if (form && resetOnClose) {
          form.reset();
        }
      } catch (error) {
        onError?.(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [onSubmit, onSuccess, onError, resetOnClose]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setEditingItem(null);
    setIsLoading(false);
  }, []);

  const openCreateDialog = useCallback(() => {
    setEditingItem(null);
    setIsOpen(true);
  }, []);

  const openEditDialog = useCallback((item: T) => {
    setEditingItem(item);
    setIsOpen(true);
  }, []);

  return {
    // Estado
    isOpen,
    isLoading,
    editingItem,
    
    // Acciones
    handleSubmit,
    handleClose,
    openCreateDialog,
    openEditDialog,
    
    // Helpers
    isEditing: !!editingItem,
  };
};
