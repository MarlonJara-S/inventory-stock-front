import { z } from 'zod';
import type { UseFormReturn, FieldValues, Path } from 'react-hook-form';

export interface BaseFormProps<TFormData extends FieldValues> {
  onSubmit: (data: TFormData) => void | Promise<void>;
  defaultValues?: Partial<TFormData>;
  isLoading?: boolean;
  schema: z.ZodSchema<TFormData>;
}

export interface FormFieldConfig<TFormData extends FieldValues> {
  name: Path<TFormData>;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'number';
  placeholder?: string;
  description?: string;
  options?: Array<{ value: string | number; label: string }>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  // Layout properties
  colSpan?: number; // Número de columnas que ocupa (1-12)
  colStart?: number; // Columna donde inicia (1-12)
  colEnd?: number; // Columna donde termina (1-13)
  fullWidth?: boolean; // Si ocupa todo el ancho disponible
  order?: number; // Orden de aparición (para reorganizar campos)
}

export interface FormDialogProps<TFormData extends FieldValues> extends BaseFormProps<TFormData> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  submitText?: string;
  cancelText?: string;
  fields: FormFieldConfig<TFormData>[];
}

export interface UseFormDialogConfig<TFormData extends FieldValues> {
  schema: z.ZodSchema<TFormData>;
  onSubmit: (data: TFormData) => void | Promise<void>;
  defaultValues?: Partial<TFormData>;
}

export interface UseFormDialogReturn<TFormData extends FieldValues> {
  form: UseFormReturn<TFormData>;
  isLoading: boolean;
  handleSubmit: (data: TFormData) => Promise<void>;
  reset: () => void;
}
