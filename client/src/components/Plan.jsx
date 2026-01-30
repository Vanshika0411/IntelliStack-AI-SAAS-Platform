import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <div
      className="
        relative px-4 sm:px-20 xl:px-32 py-28
        bg-gradient-to-b from-[#1E2235] via-[#2C3050] to-[#3A3F6B]
        overflow-hidden
      "
    >
      {/* Floating blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-700/20 rounded-full blur-[150px] animate-blob" />
      <div className="absolute top-10 right-[-200px] w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-[180px] animate-blob animation-delay-2000" />

      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-white text-[42px] font-semibold relative z-10 tracking-wide opacity-0 animate-fadeUp">
          Choose Your Plan
        </h2>
        <p className="text-slate-300 max-w-lg mx-auto mt-3 leading-relaxed opacity-0 animate-fadeUp">
          Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="mt-14 max-sm:mx-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-inner hover-glow-dark transition-all duration-300">
          <PricingTable />
        </div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          /* Blob Animation */
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(20px, -15px) scale(1.05); }
            66% { transform: translate(-15px, 20px) scale(0.95); }
          }
          .animate-blob { animation: blob 20s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }

          /* Fade-up */
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }

          /* Hover glow for cards */
          .hover-glow-dark:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 20px 40px rgba(255, 255, 255, 0.15);
            border-color: rgba(255,255,255,0.3);
          }

          /* Floating particles */
          @keyframes float {
            0% { transform: translateY(0px); opacity: 0.5; }
            50% { transform: translateY(-20px); opacity: 1; }
            100% { transform: translateY(0px); opacity: 0.5; }
          }
          .animate-float { animation: float linear infinite; }

          /* Inner shadow for cards */
          .shadow-inner {
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
          }
        `}
      </style>
    </div>
  );
};

export default Plan;