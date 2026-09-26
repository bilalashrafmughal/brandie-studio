import axios from "axios";

/**
 * Base URL for the Brandie Admin API.
 * Override via VITE_API_URL in a `.env` file, otherwise fall back to
 * the local backend defined in `api.md`.
 */
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:5000/api";

export const BACKEND_URL: string =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ?? "http://localhost:5000";

/** Shared axios instance used across all API modules. */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach a Bearer token to every subsequent request.
 * Useful once protected routes are needed.
 */
export const setAuthToken = (token: string | null): void => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};
