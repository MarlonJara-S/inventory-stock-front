import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { suppliersApi } from '../services/suppliers.services';
import type { Supplier, CreateSupplierRequest, UpdateSupplierRequest, CreateSupplierResponse, UpdateSupplierResponse } from '../../suppliers/types';
import { toast } from 'sonner';

export const supplierKeys = {
    all: ['suppliers'] as const,
    lists: () => [...supplierKeys.all, 'list'] as const,
    details: () => [...supplierKeys.all, 'detail'] as const,
    detail: (id: number) => [...supplierKeys.details(), id] as const,
    active: () => [...supplierKeys.all, 'active'] as const
}

export const useSuppliers = (pageSize: number = 100) => {
    return useQuery({
        queryKey: supplierKeys.lists(),
        queryFn: async (): Promise<Supplier[]> => {
            const response = await suppliersApi.getAll({ page_size: pageSize });
            return response.data.results || [];
        },
        staleTime: 5 * 60 * 1000,  // 5 minutos de caché 
    })
}

export const useSupplier = (id: number) => {
    return useQuery({
        queryKey: supplierKeys.detail(id),
        queryFn: async () => {
            const response = await suppliersApi.getById(id)
            return (await response).data 
        },
        enabled: !!id
    })
}

export const useActiveSuppliers = () => {
    return useQuery({
        queryKey: supplierKeys.active(),
        queryFn: async (): Promise<Supplier[]> => {
            const response = await suppliersApi.getByActive();
            return response.data || [];
        },
        staleTime: 5 * 60 * 1000,
    });
}

export const useCreateSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateSupplierRequest): Promise<CreateSupplierResponse> => {
            const response = await suppliersApi.create(data);
            return response.data;
        },
        onSuccess: (response: CreateSupplierResponse) => {
            queryClient.invalidateQueries({
                queryKey: supplierKeys.lists()
            });
            queryClient.invalidateQueries({
                queryKey: supplierKeys.active()
            });
            toast.success(response.message);
        },
        onError: (error) => {
            console.error('Error creating supplier:', error);
            toast.error('Error al crear el proveedor');
        },
    });
}

export const useUpdateSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateSupplierRequest }): Promise<UpdateSupplierResponse> => {
            const response = await suppliersApi.patch(id, data);
            return response.data;
        },
        onSuccess: (response: UpdateSupplierResponse, variables) => {
            // Actualiza el caché del supplier específico
            queryClient.setQueryData(supplierKeys.detail(variables.id), response.data);
            // Invalida las listas
            queryClient.invalidateQueries({ queryKey: supplierKeys.lists() });
            queryClient.invalidateQueries({ queryKey: supplierKeys.active() });
            toast.success(response.message);
        },
        onError: (error) => {
            console.error('Error updating supplier:', error);
            toast.error('Error al actualizar el proveedor');
        },
    });
}

export const useDeactivateSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number): Promise<{ message: string }> => {
            const response = await suppliersApi.desactivate(id);
            return response.data;
        },
        onSuccess: (response, supplierId) => {
            // Actualiza el caché del supplier específico marcándolo como inactivo
            queryClient.setQueryData(
                supplierKeys.detail(supplierId), 
                (oldData: Supplier | undefined) => 
                    oldData ? { ...oldData, is_active: false } : undefined
            );
            
            // Invalida las listas para que se actualicen
            queryClient.invalidateQueries({ queryKey: supplierKeys.lists() });
            queryClient.invalidateQueries({ queryKey: supplierKeys.active() });
            
            toast.success(response.message);
        },
        onError: (error) => {
            console.error('Error deactivating supplier:', error);
            toast.error('Error al desactivar el proveedor');
        },
    });
}