import axios from 'axios';
import type { ContentItem } from '../types';


const BASE_URL = 'https://closet-recruiting-api.azurewebsites.net/api';

/**
 
 * @param page 
 * @param pageSize 
 * @returns 
 */
export const fetchContentList = async (
  page: number,
  pageSize: number = 12
): Promise<{ items: ContentItem[]; total: number }> => {
  try {
    // fetch data from API
    const response = await axios.get(`${BASE_URL}/data`);
    
    
    if (response.status === 200) {
      
      if (Array.isArray(response.data)) {
        return {
          items: response.data as ContentItem[],
          total: response.data.length
        };
      }
      
     
      if (response.data && response.data.data) {
       
        if (response.data.data.list && response.data.data.total) {
          return {
            items: response.data.data.list as ContentItem[],
            total: response.data.data.total
          };
        }
        
        if (Array.isArray(response.data.data)) {
          return {
            items: response.data.data as ContentItem[],
            total: response.data.data.length
          };
        }
      }
      
     
      console.warn('API response format not recognized, trying to convert');
      const items = Array.isArray(response.data) 
        ? response.data 
        : [response.data];
        
      return {
        items: items as ContentItem[],
        total: items.length
      };
    }
    
    throw new Error(`API request failed with status: ${response.status}`);
    
  } catch (error) {
    console.error('Failed to fetch content list:', error);
    throw new Error('Failed to load content from API');
  }
};
