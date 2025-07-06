import React from 'react'
import { useSuppliers } from '../hooks/useSuppliers';
import { useSupplierForm } from '../hooks/useSupplierForm';
import { Loading } from '@/components/loading/Loading';
import { DataTable } from '@/app/shared/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { createSupplierColumns } from '../components/table/columns';
import { SupplierFormDialog } from '../components/forms/SupplierFormDialog';

export const SupplierList: React.FC = () => {
    const { data: suppliers, isLoading } = useSuppliers();
    
    const supplierFormState = useSupplierForm({
        onSuccess: () => {
            console.log('Supplier saved successfully!');
        },
        onError: (error) => {
            console.error('Error saving supplier:', error);
        },
    });

    const columns = React.useMemo(() => 
        createSupplierColumns({
            onEdit: supplierFormState.openEditDialog,
        }),
        [supplierFormState.openEditDialog]
    );

    if (isLoading)
        return <Loading isLoading={isLoading}/>

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Proveedores</h1>
                <p className="text-muted-foreground">
                    Gestiona la información de tus proveedores
                </p>
            </div>
            
            <DataTable 
                columns={columns} 
                data={suppliers ?? []} 
                createButton={
                    <Button onClick={supplierFormState.openCreateDialog} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Crear nuevo
                    </Button>
                }
            />
            
            <SupplierFormDialog
                isOpen={supplierFormState.isOpen}
                onClose={supplierFormState.handleClose}
                onSubmit={supplierFormState.handleSubmit}
                supplier={supplierFormState.editingSupplier}
                isLoading={supplierFormState.isLoading}
            />
        </>
    )
}
