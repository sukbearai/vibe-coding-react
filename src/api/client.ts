import { ZodSchema } from 'zod';
import { ApiError, BusinessError } from '@/types/error';
import { toast } from 'sonner';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const APP_ID = import.meta.env.VITE_APP_ID;

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  validateSchema?: ZodSchema<any>;
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
  successMessage?: string;
  errorMessagePrefix?: string;
};

/**
 * 基础API客户端
 * 
 * @template T - 响应数据的类型，如果是ApiResponse或ApiPayloadResponse，则直接使用
 * @param endpoint API端点路径（不包含基础URL）
 * @param options 请求选项
 * @returns 解析后的响应数据，类型为T
 */
export async function apiClient<T>(
  endpoint: string, 
  { 
    method = 'GET', 
    body, 
    headers = {}, 
    validateSchema,
    showSuccessMessage = true,
    showErrorMessage = true,
    successMessage = '操作成功',
    errorMessagePrefix
  }: FetchOptions = {}
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      ...headers,
    },
  };

  if (body) {
    // 处理FormData类型的请求体
    if (body instanceof FormData) {
      // FormData 不需要设置 Content-Type，浏览器会自动设置
      options.body = body;
    } else {
      // JSON 类型的请求体
      options.headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
      
      // 如果提供了验证schema，验证请求体
      if (validateSchema) {
        const validationResult = validateSchema.safeParse(body);
        if (!validationResult.success) {
          throw new Error(`请求数据验证失败: ${JSON.stringify(validationResult.error.format())}`);
        }
      }
      
      // 智能处理请求体：如果已经是字符串则直接使用；否则进行JSON.stringify
      if (typeof body === 'string') {
        options.body = body; // 已经是字符串，直接使用
      } else {
        options.body = JSON.stringify(body); // 不是字符串，进行序列化
      }
    }
  }

  // 从本地存储获取认证token
  const token = localStorage.getItem('auth_token');
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // 添加通用 appid 头部
  if (APP_ID) {
    options.headers = {
      'appid': APP_ID,
      ...options.headers,
    };
  }

  // 发送请求
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  // 处理HTTP错误
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})) as ApiError;
    const errorMessage = errorData.message || `API请求失败: ${response.status}`;
    const error = new Error(errorMessage) as Error & {
      status?: number;
      errors?: Record<string, string[]>;
    };
    error.status = response.status;
    error.errors = errorData.errors;
    
    // 当遇到401错误时，清除token并重定向到登录页
    if (response.status === 401) {
      toast.error('登录已过期或无效，请重新登录');
      // 提示用户已被登出
      setTimeout(() => {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }, 1000);
    } else {
      if (showErrorMessage) {
        // 显示错误通知
        const message = errorMessagePrefix ? `${errorMessagePrefix}: ${errorMessage}` : errorMessage;
        toast.error(message);
      }
      
      // 将错误信息存储在 sessionStorage 中，以便在错误页面显示
      sessionStorage.setItem('apiError', JSON.stringify({
        status: response.status,
        message: errorMessage,
        endpoint: endpoint
      }));
    }
    
    throw error;
  }

  // 如果响应为空（例如204 No Content）
  if (response.status === 204) {
    return {} as T;
  }

  // 解析JSON响应
  const data = await response.json();
  
  // 处理业务逻辑错误（即使HTTP状态为200）
  if (data && (data.code === '500' || data.code === 500)) {
    const errorMessage = data.msg || '未知业务错误';
    const error = new Error(errorMessage) as BusinessError;
    error.code = data.code;
    error.businessError = true;
    
    if (showErrorMessage) {
      // 显示业务错误通知
      const message = errorMessagePrefix ? `${errorMessagePrefix}: ${errorMessage}` : errorMessage;
      toast.error(message);
    }
    
    throw error;
  }
  
  // 显示成功消息
  if (showSuccessMessage) {
    // 优先使用后端返回的消息，如果没有则使用默认消息
    const message = data?.msg || successMessage;
    toast.success(message);
  }

  return data as T;
}
