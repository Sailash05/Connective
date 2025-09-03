const NoFollowingCard = ({ setTab }: { setTab: (tab: 'Followers'|'Following'|'Search') => void}) => {
    
    return(
        <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-2xl text-center bg-white dark:bg-gray-800 shadow-sm col-span-full w-fit mx-auto mt-5">
            <div className="flex flex-col items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-6a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 10-8 0 4 4 0 008 0z"/>
                </svg>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    No Connections Yet
                </h2>

                {/* Message */}
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                You are not following anyone right now. Start connecting with people to
                grow your network.
                </p>

                {/* Action button */}
                <button onClick={() => setTab('Search')} className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all">
                    Discover People
                </button>
            </div>
        </div>
    );
}

export default NoFollowingCard