import { AncientTimeSystemColumn } from '../types/temporal';

const API_BASE_URL = import.meta.env.VITE_WUWEI_API_URL || 'https://wuwei.alexseif.com/api/v1';
const TOKEN_STORAGE_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || 'wuwei_auth_token';

export const fetchActiveTemporalBlocks = async (): Promise<AncientTimeSystemColumn[]> => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_STORAGE_KEY) : null;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/temporal-blocks`, {
        method: 'GET',
        headers,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const rawData = json.data || json;

    if (Array.isArray(rawData) && rawData.length > 0) {
      return rawData.map((item: any, index: number) => {
        // Extract system title directly from item.tags["Time System"] array
        let systemTitle = '';
        if (item.tags && item.tags['Time System']) {
          const ts = item.tags['Time System'];
          systemTitle = Array.isArray(ts) ? ts[0] : ts;
        }

        if (!systemTitle) {
          systemTitle = item.systemName || item.system || item.name || `System ${index + 1}`;
        }

        // Collect all tag values (excluding 'Time System') as bullet points
        const points: string[] = [];
        if (item.tags && typeof item.tags === 'object') {
          Object.entries(item.tags).forEach(([key, val]) => {
            if (key !== 'Time System') {
              if (Array.isArray(val)) {
                val.forEach((v) => {
                  if (typeof v === 'string' && v.trim()) points.push(v.trim());
                });
              } else if (typeof val === 'string' && val.trim()) {
                points.push(val.trim());
              }
            }
          });
        }

        // If no bullet points were found in tags, parse from item.name tab-separated values
        if (points.length === 0 && item.name) {
          const parts = item.name.split('\t');
          parts.forEach((part: string) => {
            const trimmed = part.trim();
            if (trimmed && !trimmed.match(/am|pm/i)) {
              points.push(trimmed);
            }
          });
        }

        return {
          id: item.id ? String(item.id) : `sys-${index}`,
          systemName: systemTitle,
          bulletPoints: points.length > 0 ? points : ['Active Energy State'],
        };
      });
    }

    return [];
  } catch (error) {
    console.warn('Wuwei API request failed:', error);
    return [];
  }
};
