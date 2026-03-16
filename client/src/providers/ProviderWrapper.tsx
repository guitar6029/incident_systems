import type { ReactNode } from "react";
import AuthProvider from "./AuthProvider";

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
