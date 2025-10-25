import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchContentList } from './contentService';

vi.mock('axios');
const mockedAxios = axios as any;

describe('contentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchContentList', () => {
    it('handles array response format', async () => {
      const mockData = [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
      ];
      
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: mockData,
      });

      const result = await fetchContentList(1);
      
      expect(result.items).toEqual(mockData);
      expect(result.total).toBe(2);
    });

    it('handles nested data.data.list format', async () => {
      const mockItems = [{ id: 1, title: 'Item 1' }];
      
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: {
          data: {
            list: mockItems,
            total: 10,
          },
        },
      });

      const result = await fetchContentList(1);
      
      expect(result.items).toEqual(mockItems);
      expect(result.total).toBe(10);
    });

    it('handles nested data.data array format', async () => {
      const mockItems = [{ id: 1, title: 'Item 1' }];
      
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: {
          data: mockItems,
        },
      });

      const result = await fetchContentList(1);
      
      expect(result.items).toEqual(mockItems);
      expect(result.total).toBe(1);
    });

    it('throws error on API failure', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(fetchContentList(1)).rejects.toThrow('Failed to load content from API');
    });

    it('throws error on non-200 status', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 404,
        data: null,
      });

      await expect(fetchContentList(1)).rejects.toThrow('Failed to load content from API');
    });

    it('calls API with correct URL', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: [],
      });

      await fetchContentList(1);
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://closet-recruiting-api.azurewebsites.net/api/data'
      );
    });
  });
});