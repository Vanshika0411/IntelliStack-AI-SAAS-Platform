import React, { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import axios from "axios";
import bg1 from "../assets/bg1.png";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setContent(data.content || "");
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
      {/* LEFT CARD – Upload Resume */}
      <form
        onSubmit={onSubmitHandler}
        className="lg:col-span-2 w-full p-6 rounded-2xl
        bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80
        backdrop-blur-xl border border-purple-600/20
        shadow-lg hover:shadow-purple-500/30 transition"
      >
        <div className="flex items-center gap-3 text-white">
          <Sparkles className="w-6 text-purple-400" />
          <h1 className="text-2xl font-semibold">Resume Review</h1>
        </div>

        <p className="mt-6 text-sm text-gray-300">Upload Resume</p>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setInput(e.target.files[0])}
          required
          className="w-full mt-2 px-4 py-2 bg-[#0E1328] text-gray-200
          rounded-lg border border-purple-500/20 focus:border-purple-400
          outline-none transition"
        />

        <p className="text-xs text-gray-400 mt-1">Supports PDF resumes only.</p>

        <button
          type="submit"
          className="mt-6 w-full flex justify-center items-center gap-2
          bg-gradient-to-r from-purple-500 to-cyan-400
          text-white py-2 rounded-xl shadow-lg hover:scale-[1.03] transition"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <FileText className="w-5" />
          )}
          Resume Review
        </button>
      </form>

      {/* RIGHT CARD – Analysis Results */}

      {/* RIGHT CARD – Analysis Results */}
      <div
        className="lg:col-span-3 w-full p-6 rounded-2xl flex flex-col min-h-[28rem]
    bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80
    backdrop-blur-xl border border-purple-600/20 shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center gap-3 text-white mb-4">
          <FileText className="w-5 h-5 text-purple-400" />
          <h1 className="text-2xl font-semibold">Analysis Results</h1>
        </div>

        {/* Content */}
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center text-gray-400 flex flex-col items-center gap-5">
              <FileText className="w-10 h-10 text-purple-500" />
              <p className="max-w-md">
                Upload a resume and click “Resume Review” to get analysis
                instantly!
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex-1 overflow-y-auto text-sm text-slate-200 pr-3 pb-4">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
