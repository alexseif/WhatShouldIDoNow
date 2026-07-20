import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchActiveTemporalBlocks } from './api';

const MOCK_SAMPLE_PAYLOAD = [
  {
    id: 1,
    name: '11:00 pm - 1:00 am\tGallbladder\tWood\tYin',
    from_time: '23:00:00',
    to_time: '01:00:00',
    tags: {
      'Time System': ['Chinese Organ Clock'],
      Organ: ['Gallbladder'],
      Element: ['Wood'],
      'Energetic Qualities': ['Yin'],
    },
  },
  {
    id: 13,
    name: '12:00 am - 2:00 am\tNut\tProtection, Dreams, Night',
    from_time: '00:00:00',
    to_time: '02:00:00',
    tags: {
      'Time System': ['Egyptian Temporal System'],
      Diety: ['Thoth'],
      'Associated Qualities': ['Protection', 'Dreams', 'Night'],
    },
  },
  {
    id: 30,
    name: '10:00 pm - 2:00 am\tPitta\tDeep Sleep, Regeneration, Healing',
    from_time: '22:00:00',
    to_time: '02:00:00',
    tags: {
      'Time System': ['Ayurvedic Dosha Clock'],
      Dosha: ['Pitta'],
      'Energetic Qualities': ['Deep Sleep', 'Regeneration', 'Healing'],
    },
  },
];

describe('fetchActiveTemporalBlocks API Service', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.unstubAllGlobals();
  });

  it('correctly fetches and parses active temporal blocks from sample JSON response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: MOCK_SAMPLE_PAYLOAD }),
    } as Response);

    const result = await fetchActiveTemporalBlocks();

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(3);

    // Block 1 verification
    expect(result[0]).toEqual({
      id: '1',
      systemName: 'Chinese Organ Clock',
      bulletPoints: ['Gallbladder', 'Wood', 'Yin'],
    });

    // Block 2 verification
    expect(result[1]).toEqual({
      id: '13',
      systemName: 'Egyptian Temporal System',
      bulletPoints: ['Thoth', 'Protection', 'Dreams', 'Night'],
    });

    // Block 3 verification
    expect(result[2]).toEqual({
      id: '30',
      systemName: 'Ayurvedic Dosha Clock',
      bulletPoints: ['Pitta', 'Deep Sleep', 'Regeneration', 'Healing'],
    });
  });

  it('includes Authorization Bearer header when token is stored in localStorage', async () => {
    const mockToken = 'test-wuwei-jwt-token';

    const localStorageMock = {
      getItem: (key: string) => (key === 'wuwei_auth_token' ? mockToken : null),
      setItem: () => {},
      clear: () => {},
      removeItem: () => {},
      length: 1,
      key: () => null,
    };

    vi.stubGlobal('window', { localStorage: localStorageMock });
    vi.stubGlobal('localStorage', localStorageMock);

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: MOCK_SAMPLE_PAYLOAD }),
    } as Response);

    await fetchActiveTemporalBlocks();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/temporal-blocks'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
          'Content-Type': 'application/json',
        }),
      })
    );
  });

  it('returns empty array and logs warning on network or CORS failure', async () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch (CORS error)'));

    const result = await fetchActiveTemporalBlocks();

    expect(result).toEqual([]);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Wuwei API request failed:',
      expect.any(TypeError)
    );

    consoleWarnSpy.mockRestore();
  });
});
