export interface Response<T> {
  message?: string;
  data?: T;
  success?: boolean;
  statusCode?: number;
}
