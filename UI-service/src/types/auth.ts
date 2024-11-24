export type UserRole = 'user' | 'admin';
export type UserPlan = 'basic' | 'premium';

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  preferredTopics: string[];
  email: string;
  dateJoined: string;
  lastLogin?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  preferredTopics: string[];
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface BackendResponse {
  user?: User;
  setted_password?: boolean;
  email?: string;
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
