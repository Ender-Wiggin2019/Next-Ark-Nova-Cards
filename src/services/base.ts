/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { toast } from 'sonner';

import { enableDb } from '@/constant/env';

interface IRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

interface IRequestResponse<T = any> {
  data: T | null;
  status: number;
  ok: boolean;
}

/**
 * 基础请求函数，封装fetch并提供错误处理
 */

export async function request<T = any>(
  url: string,
  options: IRequestOptions = {},
): Promise<IRequestResponse<T>> {
  // 如果数据库被禁用，直接返回错误，不发送请求
  if (!enableDb) {
    // toast.error("Database service is disabled", {
    // 	duration: 5000,
    // 	description: "All database operations are currently unavailable",
    // });
    return {
      data: [] as T,
      status: 503,
      ok: false,
    };
  }

  const { method = 'GET', headers = {}, body, timeout = 10000 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // 尝试获取错误信息
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // 如果无法解析JSON，使用默认错误信息
      }

      toast.error(errorMessage);
      return {
        data: null,
        status: response.status,
        ok: false,
      };
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    // 错误处理和toast提示
    let errorMessage = 'Request failed';

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout';
      } else {
        errorMessage = error.message;
      }
    }

    toast.error(errorMessage);
    return {
      data: null,
      status: 0,
      ok: false,
    };
  }
}
