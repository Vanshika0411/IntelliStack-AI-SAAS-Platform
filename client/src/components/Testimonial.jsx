import { assets } from "../assets/assets";

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "John Doe",
      title: "Marketing Director, TechCorp",
      content:
        "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
      rating: 4,
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Jane Smith",
      title: "Content Creator, TechCorp",
      content:
        "ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: "David Lee",
      title: "Content Writer, TechCorp",
      content:
        "ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 4,
    },
  ];

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 py-28 relative overflow-hidden
                 bg-gradient-to-b from-[#1E2235] via-[#2C3050] to-[#3A3F6B]"
    >
      {/* Floating background blobs */}
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
      <div className="text-center relative z-10">
        <h2 className="text-white text-[42px] font-semibold relative z-10 tracking-wide">
          Loved by Creators
        </h2>
        <p className="text-slate-300 max-w-lg mx-auto mt-3 leading-relaxed opacity-0 animate-fadeUp">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      {/* Testimonial Cards with new design */}
      <div className="relative z-10 mt-16 flex flex-col md:flex-row justify-center items-start gap-8">
        {dummyTestimonialData.map((testimonial, index) => {
          const rotation = index === 0 ? "-rotate-2" : index === 1 ? "rotate-2" : "-rotate-1";
          const translateY = index === 1 ? "translate-y-8" : index === 2 ? "translate-y-16" : "";
          return (
            <div
              key={index}
              className={`group relative cursor-pointer p-8 rounded-3xl
                border border-white/10 backdrop-blur-sm
                hover:border-white/30 hover:shadow-[0_25px_60px_rgba(255,255,255,0.15)]
                transition-all duration-500 flex flex-col items-start gap-4
                ${rotation} ${translateY} md:w-1/3`}
            >
              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                  transition duration-500
                  bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-transparent blur-xl"
              />

              {/* User image */}
              <img
                src={testimonial.image}
                className="w-16 h-16 rounded-full flex-shrink-0 shadow-lg border-2 border-white/20"
                alt=""
              />

              {/* Content */}
              <div className="flex-1 mt-2">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < testimonial.rating
                            ? assets.star_icon
                            : assets.star_dull_icon
                        }
                        className="w-4 h-4"
                        alt="star"
                      />
                    ))}
                </div>

                <p className="text-slate-300 mb-4 text-sm">{testimonial.content}</p>

                <h3 className="font-medium text-white">{testimonial.name}</h3>
                <p className="text-xs text-slate-400">{testimonial.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animation CSS */}
      <style>
        {`
          /* Blob Animation */
          @keyframes blob {
            0%,100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(20px, -15px) scale(1.05); }
            66% { transform: translate(-15px, 20px) scale(0.95); }
          }
          .animate-blob { animation: blob 20s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }

          /* Fade-up for text and cards */
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .fade-up, .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }

          /* Floating particles */
          @keyframes float {
            0% { transform: translateY(0px); opacity: 0.5; }
            50% { transform: translateY(-20px); opacity: 1; }
            100% { transform: translateY(0px); opacity: 0.5; }
          }
          .animate-float { animation: float linear infinite; }
        `}
      </style>
    </div>
  );
};

export default Testimonial;