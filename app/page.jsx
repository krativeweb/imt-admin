'use client";'
import Wrapper from "@/layout/Wrapper";
import Home from "@/components/home-1";
import LogIn from "@/components/pages-menu/login";
import GuestWrapper from "./GuestWrapper";

export const metadata = {
  title: "IMT-HYDERABAD",
  description: "IMT-HYDERABAD",
};

export default function page() {
  return (
    <GuestWrapper>
      <Wrapper>
        {/*   <Home /> */}
        <LogIn />
      </Wrapper>
    </GuestWrapper>
  );
}