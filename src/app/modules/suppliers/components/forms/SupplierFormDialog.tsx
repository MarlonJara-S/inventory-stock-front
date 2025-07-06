import React from 'react';
import { GenericFormDialog } from '@/app/shared/components/dialog/GenericFormDialog';
import { supplierSchema, type SupplierFormData } from '../../schemas/supplier.schema';
import { supplierFormFields } from '../../config/supplierFormFields';
import type { Supplier } from '../../types';

interface SupplierFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SupplierFormData) => void;
  supplier?: Supplier | null;
  isLoading?: boolean;
  title?: string;
}

export const SupplierFormDialog: React.FC<SupplierFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  supplier,
  isLoading = false,
  title,
}) => {
  const isEditing = !!supplier;
  const dialogTitle = title || (isEditing ? 'Editar Proveedor' : 'Crear Proveedor');

  const defaultValues: Partial<SupplierFormData> = supplier
    ? {
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        is_active: supplier.is_active,
      }
    : {
        name: '',
        email: '',
        phone: '',
        address: '',
        is_active: true,
      };

  const handleSubmit = async (data: SupplierFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting supplier form:', error);
    }
  };

  return (
    <GenericFormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={dialogTitle}
      description={
        isEditing
          ? 'Modifica la información del proveedor'
          : 'Completa los datos para crear un nuevo proveedor'
      }
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      isLoading={isLoading}
      schema={supplierSchema}
      fields={supplierFormFields}
      submitText={isEditing ? 'Actualizar' : 'Crear'}
      cancelText="Cancelar"
    />
  );
};
