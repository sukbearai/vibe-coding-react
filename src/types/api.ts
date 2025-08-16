/**
 * 通用API响应结构，带有code和msg字段
 */
export interface ApiResponse<T> {
  code: string | number;
  msg?: string;
  data?: T;
}

/**
 * 通用API响应结构，带有payload字段
 */
export interface ApiPayloadResponse<T> {
  payload: T;
  code: string | number;
  msg: string;
}

/**
 * API错误类型
 */
export interface ApiErrorResponse {
  code: string | number;
  msg: string;
}
