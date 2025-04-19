import { useState } from 'react';
import api from '@/lib/axios';
import { useSession } from './use-session';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);
  const { user } = useSession();

  const execute = async (
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    options?: UseApiOptions<T> & {
      data?: any;
      params?: any;
    },
  ) => {
    if (!user) {
      setError(new Error('User not authenticated'));
      options?.onError?.(new Error('User not authenticated'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.request({
        method,
        url,
        data: options?.data,
        params: options?.params,
      });

      setData(response.data);
      options?.onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      options?.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    execute,
    get: (url: string, options?: UseApiOptions<T> & { params?: any }) => execute('get', url, options),
    post: (url: string, options?: UseApiOptions<T> & { data?: any }) => execute('post', url, options),
    put: (url: string, options?: UseApiOptions<T> & { data?: any }) => execute('put', url, options),
    patch: (url: string, options?: UseApiOptions<T> & { data?: any }) => execute('patch', url, options),
    delete: (url: string, options?: UseApiOptions<T>) => execute('delete', url, options),
  };
}
