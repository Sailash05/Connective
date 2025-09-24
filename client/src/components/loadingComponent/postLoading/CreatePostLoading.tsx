import { FaPen } from "react-icons/fa";
import '../animation.css'; // for animations

const CreatingPostLoading = ({ content }: { content: string }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      
      {/* Static background panel */}
      <div className="flex flex-col items-center gap-6 
                      bg-white dark:bg-gray-900 
                      rounded-2xl p-8 shadow-xl">

        {/* Floating paper */}
        <div className="relative w-28 h-40 
                        bg-gray-100 dark:bg-slate-800 
                        rounded-xl shadow-xl bounce-paper 
                        overflow-hidden flex flex-col justify-center items-start p-4">
          
          {/* Animated writing pen */}
          <FaPen className="text-blue-500 dark:text-blue-400 
                           absolute top-2 left-2 animate-pen-write" />
          
          {/* Animated lines inside the paper */}
          <div className="space-y-2 w-full mt-4">
            <div className="h-2 bg-blue-400 dark:bg-blue-500 rounded animate-line"></div>
            <div className="h-2 bg-blue-400 dark:bg-blue-500 rounded animate-line delay-200"></div>
            <div className="h-2 bg-blue-400 dark:bg-blue-500 rounded animate-line delay-400"></div>
          </div>
        </div>

        {/* Typing dots */}
        <div className="text-gray-800 dark:text-gray-200 font-bold text-lg flex items-center mt-2">
          <span>{content} your post</span>
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
        </div>

      </div>
    </div>
  );
};

export default CreatingPostLoading;
