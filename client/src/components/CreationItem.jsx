import React, { useState } from "react";
import Markdown from "react-markdown";
import { X } from "lucide-react";

const CreationItem = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setModalOpen(true)}
        className="p-4 w-full bg-gradient-to-br from-[#1E1F3D]/90 to-[#0B1020]/80 border border-purple-600/20 rounded-2xl cursor-pointer shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition flex flex-col gap-2"
      >
        <div className="flex justify-between items-center gap-4">
          {/* TEXT CONTAINER */}
          <div className="flex-1 min-w-0">
            <h2
              title={item.prompt}
              className="
                text-white font-semibold text-lg
                break-words break-all
                overflow-hidden
                line-clamp-2
              "
            >
              {item.prompt}
            </h2>

            <p className="text-gray-400 text-sm mt-1 truncate">
              {item.type} - {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* TYPE BADGE */}
          <button
            className="
              shrink-0
              bg-purple-600/50 hover:bg-purple-500
              text-white px-4 py-1
              rounded-full text-sm
              whitespace-nowrap
            "
          >
            {item.type}
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-auto bg-[#1E1F3D]/95 rounded-2xl p-6 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
            >
              <X size={28} />
            </button>

            {/* Content */}
            <h2 className="text-white text-2xl font-bold mb-2 break-words break-all">
              {item.prompt}
            </h2>

            <p className="text-gray-400 mb-4">
              {item.type} - {new Date(item.created_at).toLocaleDateString()}
            </p>

            {/* IMAGE OR TEXT */}
            {item.type === "image" ? (
              <div className="flex justify-center items-center max-h-[70vh] overflow-auto p-2">
                <img
                  src={item.content}
                  alt="full preview"
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg"
                />
              </div>
            ) : (
              <div className="text-gray-300 markdown-content overflow-auto max-h-[70vh] break-words">
                <Markdown>{item.content}</Markdown>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreationItem;
