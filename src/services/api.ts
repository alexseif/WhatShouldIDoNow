import { AncientTimeSystemColumn } from '../types/temporal';

const API_BASE_URL = import.meta.env.VITE_WUWEI_API_URL || 'https://wuwei.alexseif.com/api/v1';
const TOKEN_STORAGE_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || 'wuwei_auth_token';

/**
 * Extracts the primary time system title from an API item payload.
 * Checks item.tags['Time System'] first, then falls back to item name properties or generic fallback.
 *
 * @param item - Raw temporal block payload item from Wuwei API.
 * @param fallbackIndex - Index number used for fallback title generation.
 * @returns Formatted system title string.
 */
const extractSystemTitle = (item: any, fallbackIndex: number): string => {
  if (item?.tags?.['Time System']) {
    const ts = item.tags['Time System'];
    const title = Array.isArray(ts) ? ts[0] : ts;
    if (typeof title === 'string' && title.trim()) {
      return title.trim();
    }
  }
  return item?.systemName || item?.system || item?.name || `System ${fallbackIndex + 1}`;
};

/**
 * Extracts bullet point descriptions from an API item's tags or tab-separated name.
 *
 * @param item - Raw temporal block payload item from Wuwei API.
 * @returns Array of bullet point strings describing energetic qualities or attributes.
 */
const extractBulletPoints = (item: any): string[] => {
  const points: string[] = [];

  if (item?.tags && typeof item.tags === 'object') {
    Object.entries(item.tags).forEach(([key, val]) => {
      if (key !== 'Time System') {
        const values = Array.isArray(val) ? val : [val];
        values.forEach((v) => {
          if (typeof v === 'string' && v.trim()) {
            points.push(v.trim());
          }
        });
      }
    });
  }

  // Fallback: Parse from item.name tab-separated values if no tag bullet points were extracted
  if (points.length === 0 && item?.name) {
    item.name.split('\t').forEach((part: string) => {
      const trimmed = part.trim();
      if (trimmed && !trimmed.match(/am|pm/i)) {
        points.push(trimmed);
      }
    });
  }

  return points.length > 0 ? points : ['Active Energy State'];
};

/**
 * Fetches current active temporal blocks from the Wuwei backend API.
 * Attaches authentication Bearer token if present in localStorage.
 *
 * @returns Promise resolving to an array of AncientTimeSystemColumn objects.
 */
export const fetchActiveTemporalBlocks = async (): Promise<AncientTimeSystemColumn[]> => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_STORAGE_KEY) : null;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

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

    if (!Array.isArray(rawData) || rawData.length === 0) {
      return [];
    }

    return rawData.map((item: any, index: number) => ({
      id: item.id ? String(item.id) : `sys-${index}`,
      systemName: extractSystemTitle(item, index),
      bulletPoints: extractBulletPoints(item),
    }));
  } catch (error) {
    console.warn('Wuwei API request failed:', error);
    return [];
  }
};

