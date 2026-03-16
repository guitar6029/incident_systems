import { base_uri } from "../lib/constants";
import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await fetch(`${base_uri}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login Failed");
  }

  const data: LoginResponse = await response.json();
  return data;
};
