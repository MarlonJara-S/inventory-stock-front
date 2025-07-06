import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../services/products.services';
import type {  CreateProductRequest, UpdateProductRequest } from '../types/products.types';

// Keys para React Query (importantes para el caché)
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
  category: (categoryId: number) => [...productKeys.all, 'category', categoryId] as const,
};

// Hook para obtener todos los productos
export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.lists(), // Usa la key de lista
    // Función que hace la petición HTTP
    queryFn: async () => { 
      const response = await productsApi.getAll(); // Llama al servicio 
      return response.data.results || []; // Devuelve los datos
    },
    staleTime: 5 * 60 * 1000,  // 5 minutos de caché 
  });
};

// Hook para obtener un producto por ID
export const useProduct = (id: number) => {
  return useQuery({  // 
    queryKey: productKeys.detail(id), // Usa la key de detalle con el ID
    queryFn: async () => { // Función que hace la petición HTTP
      const response = await productsApi.getById(id); // Llama al servicio 
      return response.data;
    },
    enabled: !!id, // Solo se ejecuta si hay ID
  });
};

// Hook para crear producto
export const useCreateProduct = () => {
  const queryClient = useQueryClient(); // Obtiene el cliente de consultas

  return useMutation({ // Hook de mutación para crear producto
    mutationFn: async (data: CreateProductRequest) => { // Función que hace la petición HTTP
      const response = await productsApi.create(data); // Llama al servicio
      return response.data;
    },
    onSuccess: () => { // Callback al éxito 
      // Invalida el caché para refrescar la lista
      queryClient.invalidateQueries({ queryKey: productKeys.lists() }); // Invalida la lista de productos
    },
    onError: (error) => { 
      console.error('Error creating product:', error);
    },
  });
};

// Hook para actualizar producto
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateProductRequest }) => {
      const response = await productsApi.patch(id, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Actualiza el caché con los nuevos datos
      queryClient.setQueryData(productKeys.detail(variables.id), data);
      // Invalida la lista para refrescar
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Hook para eliminar producto
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await productsApi.delete(id);
      return id;
    },
    onSuccess: (deletedId) => {
      // Remueve el producto del caché
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
      // Invalida la lista
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

