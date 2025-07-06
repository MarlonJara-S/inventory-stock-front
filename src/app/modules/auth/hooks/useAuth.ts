import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService } from '../services/auth.service';
import { useAuthStore, useAuthActions } from './useAuthStore';
import type { LoginRequest, RegisterRequest, User } from '../types';

// Query keys para el cache
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
} as const;

// Hook para login
export const useLogin = () => {
  const { setAuth, setLoading } = useAuthActions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      setLoading(true);
      return await authService.login(credentials);
    },
    onSuccess: (response) => {
      const { user, access, refresh } = response;
      
      // Guardar en el store
      setAuth(user, { access, refresh });
      
      // Cachear el perfil del usuario
      queryClient.setQueryData(authKeys.profile(), user);
      
      toast.success(response.message || 'Login exitoso');
    },
    onError: (error: any) => {
      setLoading(false);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.email?.[0]
        || error.response?.data?.password?.[0]
        || 'Error al iniciar sesión';
      toast.error(errorMessage);
    },
  });
};

// Hook para registro
export const useRegister = () => {
  const { setAuth, setLoading } = useAuthActions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      setLoading(true);
      return await authService.register(userData);
    },
    onSuccess: (response) => {
      const { user, access, refresh } = response;
      
      // Guardar en el store
      setAuth(user, { access, refresh });
      
      // Cachear el perfil del usuario
      queryClient.setQueryData(authKeys.profile(), user);
      
      toast.success(response.message || 'Registro exitoso');
    },
    onError: (error: any) => {
      setLoading(false);
      const errorMessage = error.response?.data?.message
        || error.response?.data?.email?.[0]
        || error.response?.data?.username?.[0]
        || error.response?.data?.password?.[0]
        || 'Error al registrarse';
      toast.error(errorMessage);
    },
  });
};

// Hook para logout
export const useLogout = () => {
  const { clearAuth } = useAuthActions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (refreshToken: string) => {
      return await authService.logout(refreshToken);
    },
    onSuccess: (response) => {
      // Limpiar el store
      clearAuth();
      
      // Limpiar todo el cache de React Query
      queryClient.clear();
      
      toast.success(response.message || 'Logout exitoso');
    },
    onError: (error: any) => {
      // Incluso si falla, limpiamos la sesión local
      clearAuth();
      queryClient.clear();
      
      console.error('Error en logout:', error);
      toast.error('Sesión cerrada');
    },
  });
};

// Hook para obtener el perfil del usuario
export const useProfile = () => {
  const { isAuthenticated } = useAuthStore();
  
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authService.getProfile(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 1,
  });
};

// Hook para actualizar perfil
export const useUpdateProfile = () => {
  const { updateUser } = useAuthActions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<User>) => {
      return await authService.updateProfile(userData);
    },
    onSuccess: (response) => {
      // Actualizar el store
      updateUser(response.user);
      
      // Actualizar el cache
      queryClient.setQueryData(authKeys.profile(), response.user);
      
      toast.success(response.message || 'Perfil actualizado');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message
        || 'Error al actualizar el perfil';
      toast.error(errorMessage);
    },
  });
};

// Hook para refresh token
export const useRefreshToken = () => {
  const { tokens, setAuth, user } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      if (!tokens?.refresh) {
        throw new Error('No refresh token available');
      }
      return await authService.refreshToken(tokens.refresh);
    },
    onSuccess: (response) => {
      if (user && tokens) {
        setAuth(user, {
          access: response.access,
          refresh: tokens.refresh,
        });
      }
    },
    onError: () => {
      // Si falla el refresh, cerrar sesión
      const { clearAuth } = useAuthActions();
      clearAuth();
    },
  });
};
