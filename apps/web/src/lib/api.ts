const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = {
  async get<T>(path: string, token?: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: 'include',
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`API GET ${path} failed: ${res.status}`);
    return res.json();
  },

  async post<T>(path: string, body: unknown, token?: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `API POST ${path} failed: ${res.status}`);
    return data;
  },

  async patch<T>(path: string, body: unknown, token?: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `API PATCH ${path} failed: ${res.status}`);
    return data;
  },

  async delete<T>(path: string, token?: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`API DELETE ${path} failed: ${res.status}`);
    return res.json();
  },
};

export function getMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/images/')) return url;
  
  // Legacy local path support (fallback)
  const API_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api').replace('/api', '');
  const clean = url.startsWith('/') ? url.slice(1) : url;
  return `${API_ROOT}/${clean}`;
}

