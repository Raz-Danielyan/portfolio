import Footer from "@/molecules/footer";
import Header from "@/molecules/header";
import { useState } from "react";
import { Outlet } from "react-router";

export default function Root() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-theme-backdrop xl:p-[70px] lg:p-[32px] p-4 h-screen">
      <div className="w-full border border-stroke rounded-lg h-full bg-main-backdrop flex flex-col overflow-x-hidden relative max-w-[1920px] mx-auto">
        <Header {...{ isMenuOpen, setIsMenuOpen }} />
        {isMenuOpen ? <></> : <Outlet />}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
