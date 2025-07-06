import axios, { type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Configuración base de Axios
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token desde localStorage
const getAccessToken = (): string | null => {
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsedStorage = JSON.parse(authStorage);
      return parsedStorage.state?.tokens?.access || null;
    }
  } catch (error) {
    console.error('Error parsing auth storage:', error);
  }
  return null;
};

// Interceptor para requests - agregar token automáticamente
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses
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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Si es error 401 y no hemos reintentado ya
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refresh del token
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsedStorage = JSON.parse(authStorage);
          const refreshToken = parsedStorage.state?.tokens?.refresh;
          
          if (refreshToken) {
            const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
              refresh: refreshToken
            });
            
            const newAccessToken = response.data.access;
            
            // Actualizar el token en localStorage
            const updatedStorage = {
              ...parsedStorage,
              state: {
                ...parsedStorage.state,
                tokens: {
                  ...parsedStorage.state.tokens,
                  access: newAccessToken
                }
              }
            };
            localStorage.setItem('auth-storage', JSON.stringify(updatedStorage));
            
            // Reintentar la request original con el nuevo token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Si falla el refresh, limpiar localStorage y redirigir a login
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);