import { GenericFormDialog } from '@/app/shared/components/dialog/GenericFormDialog';
import { productSchema, type ProductFormData } from '../../schemas/product.schema';
import { productFormFields } from '../../config/productFormFields';
import { useActiveSuppliers } from '../../../suppliers/hooks/useSuppliers';
import { useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  supplier_id: number;
  is_active: boolean;
}

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void | Promise<void>;
  product?: Product | null;
  isLoading?: boolean;
}

export function ProductFormDialog({
  isOpen,
  onClose,
  onSubmit,
  product,
  isLoading = false,
}: ProductFormDialogProps) {
  const { data: suppliers = [] } = useActiveSuppliers();
  const isEditing = !!product;
  
  // Configurar los campos dinámicamente con los proveedores
  const fieldsWithSuppliers = useMemo(() => {
    return productFormFields.map(field => {
      if (field.name === 'supplier_id') {
        return {
          ...field,
          options: suppliers.map(supplier => ({
            value: supplier.id,
            label: supplier.name,
          })),
        };
      }
      return field;
    });
  }, [suppliers]);
  
  const defaultValues: Partial<ProductFormData> = product
    ? {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        supplier_id: product.supplier_id,
        is_active: product.is_active,
      }
    : {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        supplier_id: 0,
        is_active: true,
      };

  return (
    <GenericFormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Producto' : 'Nuevo Producto'}
      description={
        isEditing
          ? 'Modifica la información del producto'
          : 'Completa los datos para crear un nuevo producto'
      }
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      isLoading={isLoading}
      schema={productSchema}
      fields={fieldsWithSuppliers}
      submitText={isEditing ? 'Actualizar' : 'Crear'}
      cancelText="Cancelar"
    />
  );
}
