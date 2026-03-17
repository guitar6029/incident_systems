import Nav from "@/components/ui/nav";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>
        {children}
        <Outlet />
      </main>
    </>
  );
}
