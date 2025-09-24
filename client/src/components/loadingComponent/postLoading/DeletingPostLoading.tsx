import { FaTrashAlt } from "react-icons/fa";
import '../animation.css'; // for animations like spin or bounce

const DeletingPostLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      {/* Static card background */}
      <div className="flex flex-col items-center gap-6 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
        
        {/* Trash icon with spinning animation */}
        <div className="w-24 h-24 rounded-full bg-red-500 dark:bg-red-600 flex items-center justify-center shadow-lg animate-spin-slow">
          <FaTrashAlt className="text-white text-4xl" />
        </div>

        {/* Loading text */}
        <div className="text-gray-800 dark:text-gray-200 font-bold text-lg flex items-center">
          <span>Deleting post</span>
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
        </div>

        {/* Optional bouncing shadow for effect */}
        <div className="w-16 h-2 rounded-full bg-red-500 dark:bg-red-600 opacity-30 shadow-bounce"></div>
      </div>
    </div>
  );
};

export default DeletingPostLoading;
