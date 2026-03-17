import type { RegisterRequest } from "@/types/RegisterRequest";
import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";
import type { RegisterResponse } from "@/types/RegisterResponse";
import type { AuthUser } from "@/types/AuthUser";
import { BASE_URL, API_BASE } from "../lib/constants";

// helper
function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

// LOGIN
export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  // ✅ MUST use BASE_URL (no /api)
  await fetch(`${BASE_URL}sanctum/csrf-cookie`, {
    credentials: "include",
  });

  const xsrfToken = decodeURIComponent(getCookie("XSRF-TOKEN") ?? "");

  const response = await fetch(`${API_BASE}login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": xsrfToken,
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login Failed");
  }

  return response.json();
};

// REGISTER
export const register = async (
  registerData: RegisterRequest,
): Promise<RegisterResponse> => {
  // (optional but recommended for consistency)
  await fetch(`${BASE_URL}sanctum/csrf-cookie`, {
    credentials: "include",
  });

  const response = await fetch(`${API_BASE}register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    throw new Error("Register Failed");
  }

  return response.json();
};

// LOGOUT
export const logout = async (): Promise<void> => {
  const response = await fetch(`${API_BASE}logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout Failed");
  }
};

// CHECK USER
export const checkUser = async (): Promise<AuthUser | null> => {
  const response = await fetch(`${API_BASE}user`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 401) {
    return null;
  }

  return response.json();
};
