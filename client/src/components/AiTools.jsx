import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div
      className="relative overflow-hidden px-4 sm:px-20 xl:px-32 py-32
      bg-gradient-to-b from-[#1E2235] via-[#2C3050] to-[#3A3F6B]"
    >
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] animate-blob" />
      <div className="absolute top-20 right-[-200px] w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-[180px] animate-blob delay-2000" />

      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-white text-[42px] font-semibold tracking-wide">
          Intelligent tools,{" "}
          <span className="text-indigo-400">built to perform</span>
        </h2>
        <p className="text-slate-300 mt-4 leading-relaxed">
          Powerful AI tools crafted to boost productivity, creativity and real-world impact.
        </p>
      </div>

      {/* TOOLS SECTION */}
      <div className="relative z-10 mt-28 space-y-28">
        {AiToolsData.map((tool, index) => {
          const reverse = index % 2 !== 0;

          return (
            <div
              key={index}
              onClick={() => user && navigate(tool.path)}
              className="group relative cursor-pointer
              rounded-3xl p-12
              border border-white/10
              hover:border-white/30
              transition-all duration-500
              backdrop-blur-sm
              hover:shadow-[0_30px_90px_rgba(255,255,255,0.12)]"
            >
              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                transition duration-500
                bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-transparent blur-xl"
              />

              <div
                className={`relative z-10 flex flex-col md:flex-row items-center gap-16
                ${reverse ? "md:flex-row-reverse" : ""}`}
              >
                {/* ICON */}
                <div
                  className="w-28 h-28 rounded-2xl flex items-center justify-center
                  transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                    boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
                  }}
                >
                  <tool.Icon className="w-14 h-14 text-white" />
                </div>

                {/* CONTENT */}
                <div className="max-w-xl text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {tool.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-indigo-400 font-medium
                    group-hover:gap-3 transition-all">
                    Try this tool <span className="text-xl">→</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(25px,-20px) scale(1.05); }
          66% { transform: translate(-20px,25px) scale(0.95); }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .delay-2000 {
          animation-delay: 2s;
        }

        @keyframes float {
          0% { transform: translateY(0); opacity: .4; }
          50% { transform: translateY(-20px); opacity: .8; }
          100% { transform: translateY(0); opacity: .4; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AiTools;




