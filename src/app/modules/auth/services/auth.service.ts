import { apiClient } from '../../../shared/api/api';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User 
} from '../types';

class AuthService {
  private readonly baseURL = '/auth';

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.baseURL}/login/`,
      credentials
    );
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.baseURL}/register/`,
      userData
    );
    return response.data;
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      `${this.baseURL}/logout/`,
      { refresh: refreshToken }
    );
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>(`${this.baseURL}/profile/`);
    return response.data;
  }

  async updateProfile(userData: Partial<User>): Promise<{ message: string; user: User }> {
    const response = await apiClient.put<{ message: string; user: User }>(
      `${this.baseURL}/profile/`,
      userData
    );
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    const response = await apiClient.post<{ access: string }>(
      `${this.baseURL}/token/refresh/`,
      { refresh: refreshToken }
    );
    return response.data;
  }
}

export const authService = new AuthService();
