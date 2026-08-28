export interface JwtPayload {
  userId?: number;
  id?: number;
  role?: string;
  roles?: string[];
  email?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

/**
 * Safely decodes a JWT token without requiring external dependencies
 */
export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Extracts user role from a JWT token string
 */
export function extractRoleFromToken(token: string): string | null {
  const payload = decodeJwt(token);
  if (!payload) return null;

  if (typeof payload.role === 'string') {
    return payload.role.toUpperCase();
  }

  if (Array.isArray(payload.roles) && payload.roles.length > 0) {
    const adminRole = payload.roles.find((r) => String(r).toUpperCase() === 'ADMIN');
    return adminRole ? 'ADMIN' : String(payload.roles[0]).toUpperCase();
  }

  return null;
}
