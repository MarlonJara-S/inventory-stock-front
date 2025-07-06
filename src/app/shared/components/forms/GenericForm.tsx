import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, DefaultValues } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { GenericFormField } from './GenericFormField';
import type { FormFieldConfig } from '../../types/form.types';
import { z } from 'zod';

interface GenericFormProps<TFormData extends FieldValues> {
  onSubmit: (data: TFormData) => void | Promise<void>;
  defaultValues?: DefaultValues<TFormData>;
  isLoading?: boolean;
  schema: z.ZodSchema<TFormData>;
  fields: FormFieldConfig<TFormData>[];
  submitText?: string;
  resetText?: string;
  className?: string;
  children?: React.ReactNode;
  showReset?: boolean;
}

export function GenericForm<TFormData extends FieldValues>({
  onSubmit,
  defaultValues,
  isLoading = false,
  schema,
  fields,
  submitText = 'Guardar',
  resetText = 'Cancelar',
  className,
  children,
  showReset = true,
}: GenericFormProps<TFormData>) {
  const form = useForm<TFormData>({
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  const handleSubmit = async (data: TFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleReset = () => {
    form.reset(defaultValues);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`space-y-4 ${className || ''}`}
      >
        {/* Grid container responsive para los campos */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {fields.map((field) => (
            <GenericFormField
              key={field.name}
              field={field}
              control={form.control}
              register={form.register}
              error={form.formState.errors[field.name] as any}
            />
          ))}
        </div>
        
        {children}

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Guardando...' : submitText}
          </Button>
          
          {showReset && (
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isLoading}
            >
              {resetText}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
