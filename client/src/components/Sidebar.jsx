import React from "react";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-72 bg-gradient-to-b from-[#0B1020] to-[#1B1F36]/95 backdrop-blur-xl
      border-r border-white/10
      flex flex-col justify-between
      max-sm:absolute top-14 bottom-0 left-0 z-40
      ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      transition-transform duration-300 ease-in-out shadow-lg`}
    >
      {user && (
        <div className="my-7 w-full px-6">
          {/* USER INFO */}
          <img
            src={user.imageUrl}
            alt="User avatar"
            className="w-16 h-16 rounded-full mx-auto ring-2 ring-purple-500/40 transition-transform duration-300 hover:scale-105"
          />
          <h1 className="mt-3 text-center font-semibold text-gray-100 text-lg">
            {user.fullName}
          </h1>

          {/* NAV ITEMS */}
          <div className="mt-6 space-y-2 text-sm font-medium">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/ai"}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-lg shadow-purple-500/30 scale-105"
                      : "text-gray-300 hover:bg-white/10 hover:translate-x-1 hover:shadow-md"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      className={`shrink-0 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                    <span className="whitespace-nowrap">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="w-full border-t border-white/10 p-4 px-6 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-3 items-center cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <img
            src={user.imageUrl}
            className="w-9 h-9 rounded-full ring-1 ring-white/20"
            alt=""
          />
          <div>
            <h1 className="text-sm font-medium text-gray-100">
              {user.fullName}
            </h1>
            <p className="text-xs text-gray-400">
              <Protect plan="premium" fallback="Free">Premium</Protect> Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;