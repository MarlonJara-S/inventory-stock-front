# Ejemplo: Aplicar el Sistema a Productos

Este ejemplo muestra cómo usar el sistema de formularios genérico para el módulo de productos.

## 1. Schema de Productos (products/schemas/product.schema.ts)

```typescript
import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  
  price: z
    .number()
    .min(0.01, 'El precio debe ser mayor a 0'),
  
  category: z
    .string()
    .min(1, 'La categoría es requerida'),
  
  stock: z
    .number()
    .int()
    .min(0, 'El stock no puede ser negativo'),
  
  is_active: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;
```

## 2. Configuración de Campos (products/config/productFormFields.ts)

```typescript
import type { FormFieldConfig } from '@/app/shared/types/form.types';
import type { ProductFormData } from '../schemas/product.schema';

export const productFormFields: FormFieldConfig<ProductFormData>[] = [
  {
    name: 'name',
    label: 'Nombre del Producto',
    type: 'text',
    placeholder: 'Ingrese el nombre del producto',
    required: true,
  },
  {
    name: 'description',
    label: 'Descripción',
    type: 'textarea',
    placeholder: 'Describe el producto...',
    required: true,
  },
  {
    name: 'price',
    label: 'Precio',
    type: 'number',
    placeholder: '0.00',
    required: true,
  },
  {
    name: 'category',
    label: 'Categoría',
    type: 'select',
    required: true,
    options: [
      { value: 'electronics', label: 'Electrónicos' },
      { value: 'clothing', label: 'Ropa' },
      { value: 'books', label: 'Libros' },
      { value: 'home', label: 'Hogar' },
    ],
  },
  {
    name: 'stock',
    label: 'Stock',
    type: 'number',
    placeholder: '0',
    required: true,
  },
  {
    name: 'is_active',
    label: 'Producto Activo',
    type: 'checkbox',
    description: 'Marque si el producto está disponible para la venta',
  },
];
```

## 3. Hook de Productos (products/hooks/useProductDialog.ts)

```typescript
import { useFormDialog } from '@/app/shared/hooks/useFormDialog';
import { useCreateProduct, useUpdateProduct } from './useProducts';
import type { ProductFormData } from '../schemas/product.schema';
import type { Product } from '../types';

interface UseProductDialogProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useProductDialog = ({ onSuccess, onError }: UseProductDialogProps = {}) => {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const handleSubmit = async (data: ProductFormData, editingProduct?: Product | null) => {
    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({
          id: editingProduct.id,
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

  const dialogState = useFormDialog<Product>({
    onSubmit: async () => {}, // Se maneja en handleFormSubmit
    onSuccess,
    onError,
  });

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return {
    ...dialogState,
    isLoading,
    handleFormSubmit: handleSubmit,
  };
};
```

## 4. Componente de Acciones (products/components/table/ProductTableActions.tsx)

```typescript
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Button } from '@/components';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useProductDialog } from '../../hooks/useProductDialog';
import { GenericFormDialog } from '@/app/shared/components/dialog/GenericFormDialog';
import { productSchema, type ProductFormData } from '../../schemas/product.schema';
import { productFormFields } from '../../config/productFormFields';
import type { Product } from '../../types';

interface ProductTableActionsProps {
  product: Product;
}

export const ProductTableActions: React.FC<ProductTableActionsProps> = ({ product }) => {
  const {
    isOpen,
    editingItem: editingProduct,
    isLoading,
    handleFormSubmit,
    handleClose,
    openEditDialog,
  } = useProductDialog({
    onSuccess: () => {
      console.log('Product saved successfully!');
    },
    onError: (error) => {
      console.error('Error saving product:', error);
    },
  });

  const handleEdit = () => {
    openEditDialog(product);
  };

  const handleSubmit = async (data: ProductFormData) => {
    await handleFormSubmit(data, editingProduct);
  };

  const defaultValues: Partial<ProductFormData> = editingProduct
    ? {
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        stock: editingProduct.stock,
        is_active: editingProduct.is_active,
      }
    : {
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        is_active: true,
      };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <PencilIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2Icon className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <GenericFormDialog
        isOpen={isOpen}
        onClose={handleClose}
        title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
        description={
          editingProduct
            ? 'Modifica la información del producto'
            : 'Completa los datos para crear un nuevo producto'
        }
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        isLoading={isLoading}
        schema={productSchema}
        fields={productFormFields}
        submitText={editingProduct ? 'Actualizar' : 'Crear'}
        cancelText="Cancelar"
      />
    </>
  );
};
```

## Resultado

Con este patrón, tienes:

1. ✅ **Formularios consistentes** en toda la aplicación
2. ✅ **Validación robusta** con Zod
3. ✅ **Tipado completo** con TypeScript
4. ✅ **Reutilización** de componentes base
5. ✅ **Mantenimiento simple** - cambios centralizados
6. ✅ **Buenas prácticas** de React Hook Form

El mismo patrón se puede aplicar a cualquier módulo: usuarios, órdenes, categorías, etc.
