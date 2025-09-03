const NoFollowersCard = () => {
    return (
        <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-2xl text-center bg-white dark:bg-gray-800 shadow-sm col-span-full w-fit mx-auto mt-5">
            <div className="flex flex-col items-center gap-3">
                {/* Different Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" 
                     className="h-10 w-10 text-purple-500" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 11c0 1.657-1.343 3-3 3S6 12.657 6 11s1.343-3 3-3 3 1.343 3 3zm6 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm-6 7c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
                </svg>

                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    No Followers Yet
                </h2>

                {/* Message */}
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                    Nobody is following you at the moment. Keep engaging and sharing 
                    to attract more people to your profile.
                </p>
            </div>
        </div>
    );
}

export default NoFollowersCard;
