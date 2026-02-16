export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRequired(value: string, field = 'Field'): string {
  if (!value?.trim()) return `${field} is required`;
  return '';
}

export function validateEmail(value: string): string {
  if (!value?.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(value)) return 'Invalid email format';
  return '';
}

export function validatePassword(value: string): string {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return '';
}

export function validatePasswordConfirm(password: string, confirm: string): string {
  if (confirm !== password) return 'Passwords do not match';
  return '';
}
