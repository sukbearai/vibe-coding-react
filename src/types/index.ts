export * from './api';
export * from './error';

/**
 * 分页参数接口
 */
export interface PaginationParams {
  page?: number;
  size?: number;
}

/**
 * 分页响应通用接口
 */
export interface PaginationResponse<T> {
  content: T[];
  totalElements: number;
  number: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
}
