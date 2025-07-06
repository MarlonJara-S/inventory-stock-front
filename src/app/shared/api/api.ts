import axios, { type AxiosResponse, AxiosError } from 'axios';

// Configuración base de Axios
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para responses (opcional - extrae 'results' automáticamente)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Si la respuesta tiene 'results', la extraemos
    if (response.data && response.data.results !== undefined) {
      return {
        ...response,
        data: {
          ...response.data,
          // Mantén la estructura original pero facilita el acceso
        }
      };
    }
    return response;
  },
  (error: AxiosError) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);