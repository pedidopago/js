export interface APIError {
  status: number;
  headers: any;
  error?: string;
  message?: string;
}

export type IsValidFunc = () => boolean;

export interface APIResponse<T = any> {
  data?: T;
  status: number;
  statusText: string;
  headers?: any;
  error?: string;
  success: IsValidFunc;
}
