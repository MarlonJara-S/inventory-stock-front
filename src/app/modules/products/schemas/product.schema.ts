import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres'),
  
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede tener más de 500 caracteres'),
  
  price: z
    .number()
    .positive('El precio debe ser mayor a 0')
    .max(999999.99, 'El precio no puede exceder $999,999.99'),
  
  stock: z
    .number()
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  
  category: z
    .string()
    .min(1, 'La categoría es requerida'),
  
  supplier_id: z
    .number()
    .positive('Debe seleccionar un proveedor'),
  
  is_active: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;

// Esquema para la creación (sin id)
export const createProductSchema = productSchema;

// Esquema para la actualización (con id opcional)
export const updateProductSchema = productSchema.extend({
  id: z.number().optional(),
});
