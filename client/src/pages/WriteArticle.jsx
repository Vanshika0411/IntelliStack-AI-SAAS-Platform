import React, { useState } from "react";
import { Edit, Sparkles } from "lucide-react";
import bg1 from "../assets/bg1.png";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    try {
      setLoading(true);
      setContent("");

      const token = await getToken();
      const prompt = `Write an article about "${input}" in ${selectedLength.text}`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-2xl font-semibold">AI Article Generator</h1>
        </div>

        <p className="mt-6 text-sm text-gray-300">Enter a topic</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="The future of AI..."
          className="w-full mt-2 px-4 py-2 bg-[#0E1328] text-gray-200
          rounded-lg border border-purple-500/20 focus:border-purple-400
          outline-none transition"
          required
        />

        <p className="mt-4 text-sm text-gray-300">Select Article Length</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {articleLength.map((item) => (
            <span
              key={item.text}
              onClick={() => setSelectedLength(item)}
              className={`px-4 py-1 text-sm rounded-full cursor-pointer border transition-all
                ${
                  selectedLength.text === item.text
                    ? "bg-purple-500/30 text-purple-200 border-purple-400"
                    : "bg-[#1B1D38] text-gray-400 border-gray-700 hover:border-purple-400"
                }`}
            >
              {item.text}
            </span>
          ))}
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
            <Edit className="w-5 h-5" />
          )}
          Generate Article
        </button>
      </form>

      {/* RIGHT CARD – Output */}
      <div
        className="lg:col-span-3 w-full p-6 rounded-2xl flex flex-col min-h-[28rem]
        bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80
        backdrop-blur-xl border border-purple-600/20 shadow-lg"
      >
        <div className="flex items-center gap-3 text-white mb-4">
          <Edit className="w-5 h-5 text-purple-400" />
          <h1 className="text-2xl font-semibold">Generated Article</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center text-gray-400 text-center">
            Enter a topic and click “Generate Article” to see results instantly!
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto text-sm text-slate-300">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;