"use client";
import dynamic from "next/dynamic";
import DashboadHome from "@/components/admin/admin-dashboard/dashboard";
import { useAuth } from "@/app/admin/context/AuthContext";

import { useEffect } from "react";

const index = () => {
 
    

    // console.log("Logged User:", user);

  return (
    <>
    
      <DashboadHome />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
