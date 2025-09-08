/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { toast } from 'sonner';

interface IRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

interface IRequestResponse<T = any> {
  data: T;
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
      throw new Error(`HTTP error! status: ${response.status}`);
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
    throw error;
  }
}
