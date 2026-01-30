import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="
        relative px-6 md:px-16 lg:px-24 xl:px-32 pt-14 w-full
        bg-gradient-to-t from-[#1E2235] via-[#2C3050] to-[#3A3F6B]
        text-slate-300 overflow-hidden
      "
    >
      {/* Subtle background glow */}
      <div className="absolute -bottom-32 -right-32 w-[360px] h-[360px] bg-indigo-600/20 rounded-full blur-[140px]" />
      <div className="absolute top-0 -left-40 w-[420px] h-[420px] bg-purple-600/20 rounded-full blur-[160px]" />

      {/* Main footer */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10 border-t border-white/15 pt-8">
        
        {/* Brand section */}
        <div className="max-w-md">
          <img
            src={logo}
            alt="IntelliStack AI"
            className="h-14 w-auto object-contain
                       drop-shadow-[0_0_18px_rgba(99,102,241,0.45)]"
          />

          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            IntelliStack is a powerful AI SaaS platform built to streamline
            content creation and productivity. Access multiple AI tools from a
            single, intuitive dashboard.
          </p>
        </div>

        {/* App-only links */}
        <div className="flex gap-14 flex-wrap">
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="hover:text-indigo-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-indigo-400 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/help" className="hover:text-indigo-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/billing" className="hover:text-indigo-400 transition">
                  Billing & Plans
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <p className="relative z-10 text-center text-xs md:text-sm text-slate-400 pt-6 pb-5">
        © {new Date().getFullYear()} IntelliStack AI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;