import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Configuración del QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos - datos "frescos"
      gcTime: 10 * 60 * 1000,   // 10 minutos - tiempo en caché
      retry: 1,                 // Solo reintenta 1 vez si falla
      refetchOnWindowFocus: false, // No refetch al cambiar de ventana
    },
    mutations: {
      retry: 1, // Solo reintenta mutaciones 1 vez
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Herramientas de desarrollo - solo en development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};