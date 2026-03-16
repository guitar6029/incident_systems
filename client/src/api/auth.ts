import type { RegisterRequest } from "@/types/RegisterRequest";
import { base_uri } from "../lib/constants";
import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";
import type { RegisterResponse } from "@/types/RegisterResponse";

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await fetch(`${base_uri}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login Failed");
  }

  const data: LoginResponse = await response.json();
  return data;
};

export const register = async (
  registerData: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await fetch(`${base_uri}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    throw new Error("Register Failed");
  }

  const data: RegisterResponse = await response.json();
  return data;
};

export const logout = async (token: string): Promise<void> => {
  const response = await fetch(`${base_uri}logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout Failed");
  }
};
