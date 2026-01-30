import React, { useEffect, useState } from "react";
import { Protect, useAuth } from "@clerk/clerk-react";
import { Gem, Sparkles } from "lucide-react";
import CreationItem from "../components/CreationItem";
import bg from "../assets/bg1.png";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken, isSignedIn } = useAuth();

  const getDashboardData = async () => {
    try {
      if (!isSignedIn) {
        toast.error("User not signed in!");
        setLoading(false);
        return;
      }

      const token = await getToken().catch(() => null);
      if (!token) {
        toast.error("Unable to get auth token");
        setLoading(false);
        return;
      }

      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${token}` },
      });

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

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div
      className="h-full overflow-y-auto p-6 sm:p-8 flex flex-col gap-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Top Stats Cards */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:justify-start">
        {/* Total Creations */}
        <div className="flex-1 min-w-[220px] p-6 rounded-3xl bg-gradient-to-r from-purple-600/60 to-indigo-500/50 shadow-lg hover:shadow-purple-400/50 transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-200 text-sm">Total Creations</p>
              <h2 className="text-white font-bold text-2xl">{creations.length}</h2>
            </div>
            <div className="w-12 h-12 flex justify-center items-center rounded-full bg-white/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Active Plan */}
        <div className="flex-1 min-w-[220px] p-6 rounded-3xl bg-gradient-to-r from-pink-500/60 to-purple-600/50 shadow-lg hover:shadow-pink-400/50 transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-200 text-sm">Active Plan</p>
              <h2 className="text-white font-bold text-2xl">
                <Protect plan="premium" fallback={<span>Free</span>}>
                  Premium
                </Protect>
              </h2>
            </div>
            <div className="w-12 h-12 flex justify-center items-center rounded-full bg-white/20">
              <Gem className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Creations Header */}
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-purple-400" />
        <h2 className="text-white text-3xl font-bold tracking-wide">Recent Creations</h2>
        <div className="flex-1 h-1 bg-purple-500 rounded-full"></div>
      </div>

      {/* Recent Creations List */}
      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <div className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
          {creations.length === 0 ? (
            <div className="text-center text-gray-400 flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80 backdrop-blur-xl rounded-2xl border border-purple-600/20 shadow-lg">
              <Sparkles className="w-10 h-10 text-purple-500" />
              <p>No creations yet! Start creating to see them here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {creations.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;