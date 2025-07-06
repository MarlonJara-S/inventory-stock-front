import type { FieldError, UseFormRegister, FieldValues, Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Controller } from 'react-hook-form';
import type { FormFieldConfig } from '../../types/form.types';

interface GenericFormFieldProps<T extends FieldValues> {
  field: FormFieldConfig<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export function GenericFormField<T extends FieldValues>({
  field,
  control,
  register,
  error,
}: GenericFormFieldProps<T>) {
  const { 
    name, 
    label, 
    type, 
    placeholder, 
    description, 
    options, 
    required, 
    disabled, 
    className,
    colSpan,
    colStart,
    colEnd,
    fullWidth,
    order
  } = field;

  // Generar clases de CSS Grid responsive
  const getLayoutClasses = () => {
    const classes = [];
    
    // En móviles siempre ocupan todo el ancho (col-span-1 en grid-cols-1)
    // En desktop usan el sistema de 12 columnas
    if (fullWidth) {
      classes.push('col-span-1 md:col-span-full');
    } else if (colSpan) {
      classes.push(`col-span-1 md:col-span-${colSpan}`);
    } else {
      // Si no se especifica colSpan, por defecto usa todo el ancho
      classes.push('col-span-1 md:col-span-12');
    }
    
    if (colStart) {
      classes.push(`md:col-start-${colStart}`);
    }
    
    if (colEnd) {
      classes.push(`md:col-end-${colEnd}`);
    }
    
    if (order) {
      classes.push(`order-${order}`);
    }
    
    return classes.join(' ');
  };

  const layoutClasses = getLayoutClasses();
  const containerClassName = `space-y-2 ${layoutClasses} ${className || ''}`.trim();

  const renderField = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return (
          <Input
            {...register(name)}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={className}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...register(name)}
            placeholder={placeholder}
            disabled={disabled}
            className={className}
          />
        );

      case 'select':
        return (
          <Controller
            name={name}
            control={control}
            render={({ field: controllerField }) => (
              <Select
                value={controllerField.value?.toString()}
                onValueChange={controllerField.onChange}
                disabled={disabled}
              >
                <SelectTrigger className={className}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={name}
            control={control}
            render={({ field: controllerField }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={name}
                  checked={controllerField.value}
                  onCheckedChange={controllerField.onChange}
                  disabled={disabled}
                />
                <Label
                  htmlFor={name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              </div>
            )}
          />
        );

      default:
        return null;
    }
  };

  if (type === 'checkbox') {
    return (
      <div className={containerClassName}>
        {renderField()}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="text-sm text-red-500">{error.message}</p>
        )}
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}
