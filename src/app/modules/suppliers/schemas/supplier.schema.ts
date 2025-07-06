import { z } from 'zod';

export const supplierSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Debe ser un email válido')
    .max(150, 'El email no puede exceder 150 caracteres'),
  
  phone: z
    .string()
    .min(1, 'El teléfono es requerido')
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos')
    .regex(/^[\d\s\-\+\(\)]+$/, 'El teléfono solo puede contener números, espacios, guiones, paréntesis y el signo +'),
  
  address: z
    .string()
    .min(1, 'La dirección es requerida')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(200, 'La dirección no puede exceder 200 caracteres'),
  
  is_active: z.boolean(),
});

export type SupplierFormData = z.infer<typeof supplierSchema>;
