"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import api, { setAccessToken } from "../admin/lib/api";
import { useAuth } from "../../app/admin/context/AuthContext";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const checkedOnce = useRef(false);

  useEffect(() => {
    if (user || checkedOnce.current) return;
    checkedOnce.current = true;

    const verifyAuth = async () => {
      try {
        const { data } = await api.post("/api/auth/refresh");
        setAccessToken(data.token);

        const res = await api.get("/api/users/me");
        setUser(res.data.user);
      } catch {
        router.replace("/");
      }
    };

    verifyAuth();
  }, [user, router]);

  if (!user) return null; // wait
  return <>{children}</>;
}
