import { Link } from "react-router-dom";

const NoSavedPostCard = () => {
    return (
        <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-2xl text-center bg-white dark:bg-gray-800 shadow-sm col-span-full w-fit mx-auto mt-5">
            <div className="flex flex-col items-center gap-3">
                {/* Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" 
                     className="h-10 w-10 text-yellow-500" 
                     fill="none" viewBox="0 0 24 24" 
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M5 5v14l7-4 7 4V5H5z" />
                </svg>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    No Saved Posts
                </h2>

                {/* Message */}
                <p className="text-sm text-gray-500 dark:text-gray-200 max-w-sm">
                    You haven’t saved any posts yet. Start saving posts you find useful or interesting to revisit later.
                </p>

                {/* Optional Action button */}
                <Link to={'/home'} className="mt-4 px-4 py-2 bg-yellow-500 text-white text-md font-bold rounded-lg hover:bg-yellow-600 transition-all" >
                    Explore Posts
                </Link>
            </div>
        </div>
    );
};

export default NoSavedPostCard;
