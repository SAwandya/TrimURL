import axios from "axios";
import type { ApiResponse, CreateURLRequest, ExtendURLRequest, URL } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const shortenUrl = async (data: CreateURLRequest): Promise<URL> => {
  const response = await api.post<ApiResponse<URL>>("/shorten", data);
  return response.data.data;
};

export const getAllUrls = async (): Promise<URL[]> => {
  const response = await api.get<ApiResponse<URL[]>>("/urls");
  return response.data.data;
};

export const getUrlByCode = async (code: string): Promise<URL> => {
  const response = await api.get<ApiResponse<URL>>(`/url/${code}`);
  return response.data.data;
};

export const deleteUrl = async (code: string): Promise<void> => {
  await api.delete(`/url/${code}`);
};

export const extendUrlExpiration = async (
  code: string,
  data: ExtendURLRequest
): Promise<URL> => {
  const response = await api.patch<ApiResponse<URL>>(
    `/url/${code}/extend`,
    data
  );
  return response.data.data;
};
