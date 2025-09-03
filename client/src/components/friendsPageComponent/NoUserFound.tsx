const NoUserFound = () => {
    return (
        <div className="mt-8 flex flex-col items-center justify-center text-center space-y-3">
            {/* Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12l6 6m0-6l-6 6"
                />
            </svg>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                No Users Found
            </h3>

            {/* Message */}
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                We couldn't find any users matching your search.  
                Try adjusting your search or spelling.
            </p>
        </div>
    );
};

export default NoUserFound;
