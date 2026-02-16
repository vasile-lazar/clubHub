export interface AdminUser {
  id: string;
  username: string;
  email?: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  createdAt?: string;
}

export interface AdminUserFormData {
  username: string;
  email?: string;
  password?: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
}
