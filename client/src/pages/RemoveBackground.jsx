import React, { useState } from "react";
import { Eraser, Sparkles } from "lucide-react";
import axios from "axios";
import bg1 from "../assets/bg1.png";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setContent("");

      const formData = new FormData();
      formData.append("image", input);

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
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
      {/* LEFT CARD */}
      <form
        onSubmit={onSubmitHandler}
        className="lg:col-span-2 w-full p-6 rounded-2xl
        bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80
        backdrop-blur-xl border border-purple-600/20 shadow-lg"
      >
        <div className="flex items-center gap-3 text-white">
          <Sparkles className="w-6 text-purple-400" />
          <h1 className="text-2xl font-semibold">Background Removal</h1>
        </div>

        <p className="mt-6 text-sm text-gray-300">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setInput(e.target.files[0])}
          required
          className="w-full mt-2 px-4 py-2 bg-[#0E1328] text-gray-200
          rounded-lg border border-purple-500/20 focus:border-purple-400
          outline-none transition"
        />

        <p className="text-xs text-gray-400 mt-1">
          Supports JPG, PNG, WEBP formats
        </p>

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
            <Eraser className="w-5" />
          )}
          Remove Background
        </button>
      </form>

      {/* RIGHT CARD */}
      <div
        className="lg:col-span-3 w-full p-6 rounded-2xl flex flex-col min-h-[32rem]
        bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80
        backdrop-blur-xl border border-purple-600/20 shadow-lg"
      >
        <div className="flex items-center gap-3 text-white mb-4">
          <Eraser className="w-5 h-5 text-purple-400" />
          <h1 className="text-2xl font-semibold">Processed Image</h1>
        </div>

        {/* EMPTY STATE */}
        {!content && !loading && (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center text-gray-400 flex flex-col items-center gap-5">
              <Eraser className="w-10 h-10 text-purple-500" />
              <p className="max-w-md">
                Upload an image and click “Remove Background” to see results
                instantly!
              </p>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex-1 flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-purple-500/40 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* RESULT IMAGE */}
        {content && !loading && (
          <div className="flex-1 relative mt-3 rounded-xl overflow-hidden bg-[#0E1328]">
            {/* blurred background fill */}
            <img
              src={content}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30"
            />

            {/* main image */}
            <img
              src={content}
              alt="processed"
              className="relative w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
