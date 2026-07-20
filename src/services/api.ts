import { AncientTimeSystemColumn } from '../types/temporal';

const API_BASE_URL = import.meta.env.VITE_WUWEI_API_URL || 'https://wuwei.alexseif.com/api/v1';
const TOKEN_STORAGE_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || 'wuwei_auth_token';

// Default fallback systems
export const FALLBACK_ANCIENT_SYSTEMS: AncientTimeSystemColumn[] = [
  {
    id: 'egyptian-decan',
    systemName: 'Egyptian Decan & Temporal Hours',
    bulletPoints: [
      'Horus Solar Hour II',
      'Decan of Sirius Governance',
      'Vitality, Action & Solar Alignment',
    ],
  },
  {
    id: 'tcm-meridian',
    systemName: 'TCM Meridian Energy Peak',
    bulletPoints: [
      'Heart Meridian Peak Flow',
      'Circulation & Spirit (Shen)',
      'Supreme Clarity & Joy',
    ],
  },
  {
    id: 'ayurvedic-tattwa',
    systemName: 'Ayurvedic Tattwas & Dosha Cycles',
    bulletPoints: [
      'Tejas (Fire Element Tattva)',
      'Pitta Dosha Phase',
      'Transformation & Internal Agni',
    ],
  },
];

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

    const response = await fetch(`${API_BASE_URL}/temporal-blocks`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const rawData = json.data || json;

    if (Array.isArray(rawData) && rawData.length > 0) {
      // Dynamic rendering of all systems returned by the backend API
      return rawData.map((item: any, index: number) => {
        const title = item.systemName || item.system || item.name || `System ${index + 1}`;
        const points: string[] = [];

        if (item.title) points.push(item.title);
        if (item.primaryAttribute) points.push(item.primaryAttribute);
        if (Array.isArray(item.tags)) {
          item.tags.forEach((t: any) => {
            const str = typeof t === 'string' ? t : t.name;
            if (str && !points.includes(str)) points.push(str);
          });
        }

        return {
          id: item.id || `sys-${index}`,
          systemName: title,
          bulletPoints: points.length > 0 ? points : ['Active Energy State'],
        };
      });
    }

    return FALLBACK_ANCIENT_SYSTEMS;
  } catch (error) {
    console.warn('Wuwei API offline or unreachable. Using fallback systems:', error);
    return FALLBACK_ANCIENT_SYSTEMS;
  }
};
