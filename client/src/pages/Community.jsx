import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import bg1 from "../assets/bg1.png";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/get-published-creations",
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="w-10 h-10 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></span>
      </div>
    );
  }

  return (
    <div
      className="h-full p-8 flex flex-col gap-6 overflow-y-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {/* TITLE */}
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Community Creations
        </h1>
        <span className="w-16 h-1 rounded-full bg-pink-500"></span>
      </div>

      {/* GRID CONTAINER */}
      <div className="w-full bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80 backdrop-blur-xl rounded-2xl p-6">
        {creations.length === 0 ? (
          <p className="text-gray-400 text-center py-20">
            No creations yet. Start creating to see them here!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creations.map((creation, index) => (
              <div
                key={index}
                className="relative group rounded-2xl bg-[#0f1225] overflow-hidden shadow-lg hover:shadow-purple-500/30 transition"
              >
                {/* IMAGE */}
                <div className="relative w-full h-80">
                  <img
                    src={creation.content}
                    alt="Community creation"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                  <p className="text-xs text-gray-200 line-clamp-2 mb-2">
                    {creation.prompt}
                  </p>

                  <div className="flex items-center gap-1 self-end">
                    <span className="text-sm text-white">
                      {creation.likes.length}
                    </span>
                    <Heart
                      onClick={() =>
                        imageLikeToggle(creation._id || creation.id)
                      }
                      className={`w-5 h-5 cursor-pointer transition-transform hover:scale-110 ${
                        (creation.likes || []).includes(user?.id)
                          ? "fill-red-500 text-red-600"
                          : "text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
