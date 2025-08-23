// src/contexts/AuthContext/types.ts
import {
  AuthUser,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '../../types/user';

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  sendVerificationEmail: () => Promise<AuthResponse>;
  verifyEmail: (token: string) => Promise<AuthResponse>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
