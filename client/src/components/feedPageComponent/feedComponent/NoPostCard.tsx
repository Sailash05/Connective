import { useCreatePost } from "../../../context/CreatePostContext";

const NoPostCard = () => {
    const { setCreatePost } = useCreatePost();

    return (
        <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-2xl text-center bg-white dark:bg-gray-800 shadow-sm col-span-full w-fit mx-auto mt-5">
            <div className="flex flex-col items-center gap-3">
                {/* Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" 
                     className="h-10 w-10 text-blue-500" 
                     fill="none" viewBox="0 0 24 24" 
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 4v16m8-8H4" />
                </svg>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    No Posts Yet
                </h2>

                {/* Message */}
                <p className="text-sm text-gray-500 dark:text-gray-200 max-w-sm">
                    It looks like there are no posts here yet. Be the first to create one and share your thoughts!
                </p>

                {/* Optional Action button */}
                <button onClick={() => setCreatePost(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white text-md font-bold rounded-lg hover:bg-blue-600 transition-all" >
                    Create Post
                </button>
            </div>
        </div>
    );
};

export default NoPostCard;
