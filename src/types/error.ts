/**
 * 业务错误类型
 * 用于标识业务逻辑错误，与普通HTTP错误区分
 */
export interface BusinessError extends Error {
  code?: string | number;
  businessError: boolean;
}

/**
 * API错误类型
 * 用于HTTP错误
 */
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
