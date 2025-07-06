export type Supplier = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Tipos base (se pueden mover a shared/types si se reutilizan)
export type ApiResponse<T> = {
    count?: number;
    num_pages?: number;
    current_page?: number;
    results: T;
}

export type ApiMessageResponse<T> = {
    message: string;
    data: T;
}

// Tipos específicos del dominio
export type SupplierInput = Omit<Supplier, 'id' | 'created_at' | 'updated_at'>;
export type CreateSupplierRequest = SupplierInput;
export type UpdateSupplierRequest = Partial<SupplierInput>;

// Tipos de respuesta
export type SuppliersResponse = ApiResponse<Supplier[]>;
export type ActiveSuppliersResponse = Supplier[]; 
export type CreateSupplierResponse = ApiMessageResponse<Supplier>;
export type UpdateSupplierResponse = ApiMessageResponse<Supplier>;
export type DeactivateSupplierResponse = { message: string }; // Solo mensaje