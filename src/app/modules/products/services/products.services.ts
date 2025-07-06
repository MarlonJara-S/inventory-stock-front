import { apiClient } from '../../../shared/api/api';
import type { 
  Product, 
  CreateProductRequest, 
  UpdateProductRequest,
  ApiResponse,
} from '../types/products.types';


const BASE_URL = '/products/';

export const productsApi = {
  getAll: () => apiClient.get<ApiResponse<Product[]>>(BASE_URL),
  getById: (id: number) => apiClient.get<Product>(`${BASE_URL}${id}`),
  getByLowStock: () => apiClient.get<Product[]>(`${BASE_URL}low-stock/`),
  create: (data: CreateProductRequest) => apiClient.post<Product>(BASE_URL, data),
  patch: (id: number, data: UpdateProductRequest) => apiClient.patch<Product>(`${BASE_URL}${id}`, data),
  delete: (id: number) => apiClient.delete(`${BASE_URL}${id}`),


//   search: (query: string) => apiClient.get<Product[]>(`${BASE_URL}/search?q=${query}`),
//   getByCategory: (categoryId: number) => apiClient.get<Product[]>(`${BASE_URL}/category/${categoryId}`),
};