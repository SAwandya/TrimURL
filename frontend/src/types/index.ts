export interface URL {
  id: number;
  urlCode: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  expiresAt: string;
  clicks: number;
}

export interface CreateURLRequest {
  originalUrl: string;
  expiresIn?: number;
}

export interface ExtendURLRequest {
  expiresIn: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
