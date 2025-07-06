import type { FieldValues } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GenericForm } from '../forms/GenericForm';
import type { FormDialogProps } from '../../types/form.types';

export function GenericFormDialog<TFormData extends FieldValues>({
  isOpen,
  onClose,
  title,
  description,
  onSubmit,
  defaultValues,
  isLoading = false,
  schema,
  fields,
  submitText = 'Guardar',
  cancelText = 'Cancelar',
}: FormDialogProps<TFormData>) {

  const handleSubmit = async (data: TFormData) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        
        <GenericForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues as any}
          isLoading={isLoading}
          schema={schema}
          fields={fields}
          submitText={submitText}
          resetText={cancelText}
          showReset={true}
        />
      </DialogContent>
    </Dialog>
  );
}
