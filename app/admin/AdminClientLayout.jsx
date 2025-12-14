"use client";

import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import AuthWrapper from "./AuthGuard";



export default function AdminClientLayout({ children }) {

  return (
    <AuthProvider>
      <AuthWrapper>
        <div className="container shadow-lg">{children}</div>
      </AuthWrapper>
    </AuthProvider>
  );
}
