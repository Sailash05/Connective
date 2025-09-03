import { useState, useEffect, useRef, useCallback } from "react";
import useUserLoad from "../../../hooks/useUserLoad";

import UserProfileCard from "../../../components/friendsPageComponent/UserProfileCard";
import NoFollowersCard from "../../../components/friendsPageComponent/NoFollowersCard";
import StaticUserLoading from "../../../components/loadingComponent/userLoading/StaticUserLoading";

const FollowersSections = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const limit = 4;

    const [search, setSearch] = useState<string>("");
    const [sortBy, setSortBy] = useState<"popular" | "name" | "recent">("recent");
    const [isMutual, setIsMutual] = useState<boolean>(false);

    const { loading, error, userList, hasMore, resetUsers } = useUserLoad(
        pageNumber,
        limit,
        search,
        sortBy,
        isMutual,
        'followers'
    );

    const observer = useRef<IntersectionObserver | null>(null);

    const lastUserProfileRef = useCallback(
        (node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prev) => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        setPageNumber(1);
        resetUsers();
    }, [search, sortBy, isMutual]);

    return (
        <div>
            {/* Search & Sort */}
            <div className="flex flex-wrap md:gap-6 gap-3 md:mb-6 mb-3 items-center">
                <div className="w-[20rem] flex items-center border border-gray-400 rounded-xl px-3 py-2 bg-white">
                    <span className="mr-2">🔍</span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search username or email"
                        className="outline-none flex-1 bg-white"
                    />
                </div>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "popular" | "name" | "recent")} className="md:col-span-3 border rounded-xl px-3 py-2">
                    <option value="popular">Sort: Most Popular</option>
                    <option value="name">Sort: Name (A-Z)</option>
                    <option value="recent">Sort: Recent Follower</option>
                </select>

                <button onClick={() => setIsMutual((prev) => !prev)} className={`px-3 py-1 h-fit rounded-full border border-gray-400 text-sm transition-all bg-white ${isMutual ? "bg-indigo-50 border-indigo-300 text-indigo-700 scale-105" : ""}`}>
                    🤝 Mutuals only
                </button>
            </div>

            {/* Profiles */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {
                    userList.length > 0 ? (
                        userList.map((profile, index) => {
                            if (index === userList.length - 1) {
                                return <UserProfileCard user={profile} ref={lastUserProfileRef} key={index} />;
                            }
                            else {
                                return <UserProfileCard user={profile} key={index} />;
                            }
                        })
                    ) : (
                        !loading && <NoFollowersCard />
                    )
                }

                {loading && <StaticUserLoading />}
                {error && (
                    <div className="col-span-full">
                        <p className="bg-red-500 w-fit mx-auto font-bold text-white px-4 py-2 rounded-md">
                            User profile failed to load!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default FollowersSections;