import React, { useState } from "react";
import { Image, Sparkles } from "lucide-react";
import axios from "axios";
import bg1 from "../assets/bg1.png"; // Background image
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="h-full overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {/* LEFT CARD – Input */}
      <form
        onSubmit={onSubmitHandler}
        className="lg:col-span-2 w-full p-6 rounded-2xl
        bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80
        backdrop-blur-xl border border-purple-600/20 shadow-lg hover:shadow-purple-500/30 transition"
      >
        <div className="flex items-center gap-3 text-white">
          <Sparkles className="w-6 text-purple-400" />
          <h1 className="text-2xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm text-gray-300">Describe Your Image</p>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe what you want to see in the image..."
          required
          className="w-full mt-2 px-4 py-2 bg-[#0E1328] text-gray-200
          rounded-lg border border-purple-500/20 focus:border-purple-400
          outline-none transition"
        />

        <p className="mt-4 text-sm text-gray-300">Select Style</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {imageStyle.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`px-4 py-1 text-sm rounded-full cursor-pointer border transition-all
                ${
                  selectedStyle === item
                    ? "bg-purple-500/30 text-purple-200 border-purple-400"
                    : "bg-[#1B1D38] text-gray-400 border-gray-700 hover:border-purple-400"
                }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-purple-500 transition"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm text-gray-300">Make this image Public</p>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-6 w-full flex justify-center items-center gap-2
          bg-gradient-to-r from-purple-500 to-cyan-400
          text-white py-2 rounded-xl shadow-lg hover:scale-[1.03] transition"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Image className="w-5 h-5" />
          )}
          Generate Image
        </button>
      </form>

      {/* RIGHT CARD – Output */}
      <div
        className="lg:col-span-3 w-full p-6 rounded-2xl flex flex-col min-h-[28rem]
        bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80
        backdrop-blur-xl border border-purple-600/20 shadow-lg"
      >
        <div className="flex items-center gap-3 text-white mb-4">
          <Image className="w-5 h-5 text-purple-400" />
          <h1 className="text-2xl font-semibold">Generated Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center text-gray-400 flex flex-col items-center gap-5">
              <Image className="w-10 h-10 text-purple-500" />
              <p className="max-w-md">
                Describe your image and click “Generate Image” to see AI-generated visuals instantly!
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 max-h-[480px] overflow-y-auto flex justify-center">
            <img src={content} alt="image" className="w-auto max-h-[480px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;