import type { FormFieldConfig } from '@/app/shared/types/form.types';
import type { SupplierFormData } from '../schemas/supplier.schema';

export const supplierFormFields: FormFieldConfig<SupplierFormData>[] = [
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Ingrese el nombre del proveedor',
    required: true,
    colSpan: 6, 
  },
  {
    name: 'phone',
    label: 'Teléfono',
    type: 'tel',
    placeholder: '+1 234 567 8900',
    required: true,
    colSpan: 6, 
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'ejemplo@email.com',
    required: true,
    fullWidth: true, 
  },

  {
    name: 'address',
    label: 'Dirección',
    type: 'textarea',
    placeholder: 'Ingrese la dirección completa',
    required: true,
    fullWidth: true, 
  },
  {
    name: 'is_active',
    label: 'Estado',
    type: 'checkbox',
    description: 'Marque si el proveedor está activo',
    fullWidth: true,
    colSpan: 12, 
  },
];
