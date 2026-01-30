import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";
import logo from "../assets/logo.png";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen bg-[#0E1328]">
      
      {/* ================= NAVBAR ================= */}
      <nav
        className="
          w-full px-8 sm:px-12 min-h-14 flex items-center justify-between
          bg-gradient-to-r from-[#0B1020]/90 to-[#1B1F36]/80
          backdrop-blur-md
          border-b border-white/10
          shadow-sm
        "
      >
        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          className="cursor-pointer w-36 sm:w-48 object-contain
                     drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]
                     mt-1" // logo thoda upar adjust
          onClick={() => navigate("/")}
        />

        {/* MOBILE MENU ICON */}
        {sidebar ? (
          <X
            className="w-6 h-6 text-purple-300 sm:hidden cursor-pointer hover:text-purple-400 transition-colors duration-200"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="w-6 h-6 text-purple-300 sm:hidden cursor-pointer hover:text-purple-400 transition-colors duration-200"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>

      {/* ================= BODY ================= */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} 
          style={{
            background: "linear-gradient(to bottom, #0B1020, #1B1F36)",
            minWidth: "270px", // width aur bada kiya
          }}
        />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-[#12162E] p-6 text-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;