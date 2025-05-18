import { create } from "zustand";
import type { URL, CreateURLRequest, ExtendURLRequest } from "../types";
import * as api from "../services/api";

interface URLState {
  urls: URL[];
  loading: boolean;
  error: string | null;
  lastCreatedUrl: URL | null;
  success: boolean; // Added success state for modal handling
  fetchUrls: () => Promise<void>;
  createUrl: (data: CreateURLRequest) => Promise<void>;
  deleteUrl: (code: string) => Promise<void>;
  extendUrl: (code: string, data: ExtendURLRequest) => Promise<void>;
  resetSuccess: () => void; // Added resetSuccess action
}

export const useUrlStore = create<URLState>((set) => ({
  urls: [],
  loading: false,
  error: null,
  lastCreatedUrl: null,
  success: false, // Initialized success state

  fetchUrls: async () => {
    set({ loading: true, error: null, success: false }); // Reset success on new fetch
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
    set({ loading: true, error: null, success: false });
    try {
      const newUrl = await api.shortenUrl(data);
      set((state) => ({
        urls: [newUrl, ...state.urls],
        lastCreatedUrl: newUrl,
        loading: false,
        success: true, // Set success to true
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to create short URL",
        loading: false,
        success: false, // Ensure success is false on error
      });
    }
  },

  deleteUrl: async (code: string) => {
    set({ loading: true, error: null, success: false });
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
    set({ loading: true, error: null, success: false });
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

  resetSuccess: () => {
    set({ success: false });
  }, // Implemented resetSuccess action
}));
