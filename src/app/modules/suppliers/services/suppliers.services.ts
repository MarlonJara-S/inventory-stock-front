import { apiClient  } from "@/app/shared/api/api";
import { 
    type Supplier, 
    type CreateSupplierRequest,
    type UpdateSupplierRequest,
    type SuppliersResponse,
    type CreateSupplierResponse,
    type UpdateSupplierResponse,
    type ActiveSuppliersResponse,
    type DeactivateSupplierResponse,
} from './../types/supplier.types';

const BASE_URL = '/suppliers/';

export const suppliersApi = {
    getAll: (params?: { page?: number; page_size?: number; search?: string; is_active?: boolean }) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.page_size) searchParams.append('page_size', params.page_size.toString());
        if (params?.search) searchParams.append('search', params.search);
        if (params?.is_active !== undefined) searchParams.append('is_active', params.is_active.toString());
        
        const queryString = searchParams.toString();
        const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;
        
        return apiClient.get<SuppliersResponse>(url);
    },
    getById: (id: number) => apiClient.get<Supplier>(`${BASE_URL}${id}/`),
    getByActive: () => apiClient.get<ActiveSuppliersResponse>(`${BASE_URL}active/?page_size=1000`),
    create: (data: CreateSupplierRequest) => apiClient.post<CreateSupplierResponse>(BASE_URL, data),
    patch: (id: number, data: UpdateSupplierRequest) => apiClient.patch<UpdateSupplierResponse>(`${BASE_URL}${id}/`, data),
    desactivate: (id: number) => apiClient.delete<DeactivateSupplierResponse>(`${BASE_URL}${id}/`)
}