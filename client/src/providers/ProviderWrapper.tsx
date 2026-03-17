import type { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import QueryProvider from "./TanstackQueryProvider";

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
