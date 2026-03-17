import { checkUser } from "@/api/auth";
import type { AuthUser } from "@/types/AuthUser";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      const user = await checkUser();
      setUser(user);
    } catch (error) {
      console.error(`Error : ${error}`);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export default AuthProvider;
