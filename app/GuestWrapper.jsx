"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import api, { setAccessToken } from "../app/admin/lib/api";

export default function GuestWrapper({ children }) {
  const router = useRouter(); 
  const hasRun = useRef(false);

  const checkAlreadyLoggedIn = async () => {
    try {
      const { data } = await api.post("/api/auth/refresh");

      if (data?.token) {
        setAccessToken(data.token);
        router.replace("/admin/dashboard"); // 🚀 already logged in
      }
    } catch (err) {
      // not logged in → stay
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      checkAlreadyLoggedIn();
    }
  }, []);

  return children;
}
