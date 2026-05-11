const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = {
  async get<T>(path: string, token?: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
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
    });
    if (!res.ok) throw new Error(`API DELETE ${path} failed: ${res.status}`);
    return res.json();
  },
};

export function getMediaUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/images/')) return url;
  
  const API_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api').replace('/api', '');
  let cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  
  // Ensure the uploads prefix is present for local files
  if (!cleanUrl.startsWith('uploads/') && !cleanUrl.startsWith('images/')) {
    cleanUrl = `uploads/${cleanUrl}`;
  }

  // If API_ROOT is relative (e.g. just "/api" -> ""), use a absolute fallback for dev
  const root = API_ROOT || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4000');
  const cleanRoot = root.endsWith('/') ? root : `${root}/`;
  return `${cleanRoot}${cleanUrl}`;
}

