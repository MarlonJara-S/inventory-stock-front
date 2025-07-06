export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    status: boolean;
    category: {
        id: number;
        name: string;
    }
}

export type ProductFormValues = {
    name: string;
    price: number;
    stock: number;
    description: string;
    status: boolean;
    categoryId: number; 
}

// Tipo para crear producto (sin ID porque se genera automáticamente)
export type CreateProductRequest = {
    name: string;
    price: number;
    stock: number;
    description: string;
    status: boolean;
    categoryId: number;
}

// Tipo para actualizar producto (todos los campos opcionales)
export type UpdateProductRequest = {
    name?: string;
    price?: number;
    stock?: number;
    description?: string;
    status?: boolean;
    categoryId?: number;
}


export type ApiResponse<T> = {
    results: T;
    count?: number;
    next?: string;
    previous?: string;
}

export type ProductsApiResponse = ApiResponse<Product[]>;