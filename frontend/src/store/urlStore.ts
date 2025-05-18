import { create } from "zustand";
import type { URL, CreateURLRequest, ExtendURLRequest } from "../types";
import * as api from "../services/api";

interface URLState {
  urls: URL[];
  loading: boolean;
  error: string | null;
  lastCreatedUrl: URL | null;
  fetchUrls: () => Promise<void>;
  createUrl: (data: CreateURLRequest) => Promise<void>;
  deleteUrl: (code: string) => Promise<void>;
  extendUrl: (code: string, data: ExtendURLRequest) => Promise<void>;
}

export const useUrlStore = create<URLState>((set, get) => ({
  urls: [],
  loading: false,
  error: null,
  lastCreatedUrl: null,

  fetchUrls: async () => {
    set({ loading: true, error: null });
    try {
      const urls = await api.getAllUrls();
      set({ urls, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch URLs",
        loading: false,
      });
    }
  },

  createUrl: async (data: CreateURLRequest) => {
    set({ loading: true, error: null });
    try {
      const newUrl = await api.shortenUrl(data);
      set((state) => ({
        urls: [newUrl, ...state.urls],
        lastCreatedUrl: newUrl,
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to create short URL",
        loading: false,
      });
    }
  },

  deleteUrl: async (code: string) => {
    set({ loading: true, error: null });
    try {
      await api.deleteUrl(code);
      set((state) => ({
        urls: state.urls.filter((url) => url.urlCode !== code),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete URL",
        loading: false,
      });
    }
  },

  extendUrl: async (code: string, data: ExtendURLRequest) => {
    set({ loading: true, error: null });
    try {
      const updatedUrl = await api.extendUrlExpiration(code, data);
      set((state) => ({
        urls: state.urls.map((url) =>
          url.urlCode === code ? updatedUrl : url
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to extend URL expiration",
        loading: false,
      });
    }
  },
}));
