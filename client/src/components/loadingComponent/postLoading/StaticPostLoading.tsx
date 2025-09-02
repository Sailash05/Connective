const StaticPostLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-40 space-y-3">

            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                Loading Posts...
            </p>
        </div>
    );
};

export default StaticPostLoading;
