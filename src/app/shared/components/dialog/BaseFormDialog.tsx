import React from 'react';
import type { UseFormReturn, FieldValues } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BaseFormDialogProps<T extends FieldValues> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  isLoading?: boolean;
  title: string;
  children: React.ReactNode;
  form: UseFormReturn<T>;
  submitLabel?: string;
  cancelLabel?: string;
  maxWidth?: string;
}

export const BaseFormDialog = <T extends FieldValues>({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  title,
  children,
  form,
  submitLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  maxWidth = 'sm:max-w-[500px]',
}: BaseFormDialogProps<T>) => {
  const { handleSubmit, formState: { isSubmitting } } = form;
  const isFormLoading = isLoading || isSubmitting;

  const handleFormSubmit = (data: T) => {
    onSubmit(data);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={maxWidth}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid gap-4">
            {children}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isFormLoading}
            >
              {cancelLabel}
            </Button>
            <Button
              type="submit"
              disabled={isFormLoading}
              className="min-w-[100px]"
            >
              {isFormLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Guardando...
                </div>
              ) : (
                submitLabel
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
