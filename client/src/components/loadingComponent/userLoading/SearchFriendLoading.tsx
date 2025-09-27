const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

const SearchFriendLoading = () => {
  return (
    <div className="w-full max-w-4xl mx-auto md:px-6 animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="flex items-center gap-2 md:mb-8 mb-4">
        <SkeletonBox className="h-10 flex-1 rounded-xl" />
        <SkeletonBox className="h-10 w-24 rounded-xl" />
      </div>

      {/* Suggested Users Skeleton */}
      <div className="mb-8">
        <SkeletonBox className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
            >
              <div className="flex gap-4 items-center mb-4">
                <SkeletonBox className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <SkeletonBox className="h-4 w-32" />
                  <SkeletonBox className="h-3 w-24" />
                  <SkeletonBox className="h-3 w-20" />
                </div>
              </div>
              <SkeletonBox className="h-8 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Top Professionals Skeleton */}
      <div className="mb-8">
        <SkeletonBox className="h-6 w-48 mb-4" />
        <div className="divide-y divide-gray-200 dark:divide-gray-600 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <SkeletonBox className="h-6 w-6 rounded" />
                <div className="space-y-2">
                  <SkeletonBox className="h-4 w-32" />
                  <SkeletonBox className="h-3 w-20" />
                </div>
              </div>
              <SkeletonBox className="h-8 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Recently Joined Skeleton */}
      <div className="mb-10">
        <SkeletonBox className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <SkeletonBox className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <SkeletonBox className="h-4 w-32" />
                  <SkeletonBox className="h-3 w-24" />
                </div>
              </div>
              <SkeletonBox className="h-8 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFriendLoading;
