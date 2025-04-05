import api from './axios';

// Generic GET request
export const get = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
  const response = await api.get<T>(url, { params });
  return response.data;
};

// Generic POST request
export const post = async <T>(url: string, data?: any): Promise<T> => {
  console.log('post', url, data);
  const response = await api.post<T>(url, data);
  return response.data;
};

// Generic PUT request
export const put = async <T>(url: string, data?: any): Promise<T> => {
  const response = await api.put<T>(url, data);
  return response.data;
};

// Generic PATCH request
export const patch = async <T>(url: string, data?: any): Promise<T> => {
  const response = await api.patch<T>(url, data);
  return response.data;
};

// Generic DELETE request
export const del = async <T>(url: string): Promise<T> => {
  const response = await api.delete<T>(url);
  return response.data;
};
export default {
  get,
  post,
  put,
  patch,
  del,
};
