import { useState, useEffect } from "react";
import SearchUserPopup from "../../../components/friendsPageComponent/SearchUserPopup";
import SearchFriendLoading from "../../../components/loadingComponent/userLoading/SearchFriendLoading";

import { userService } from "../../../service/user.service";
import type { SuggestedUserType, TopProfessionalsType, RecentlyJoinedUserType } from "../../../types/userType";
import { istDateFormat } from "../../../utils/dateAndTime";
import { Link } from "react-router-dom";

const SuggestedUserCard = ({ user }: { user: SuggestedUserType}) => {

    const [isFollowed, setIsFollowed] = useState<boolean>(false);

    const handleFollow = async () => {
        try {
            await userService.addFollower(user._id);
            setIsFollowed(true);
        }
        catch(err) {
        }
    }
    
    return(
        <div key={user._id} className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition dark:bg-slate-800 dark:border-gray-800 flex flex-col gap-2">
            <div className="flex gap-4 items-center">
                <img src={user.profilePicture ? user.profilePicture : 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg'} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div>
                    <h3 className="text-lg font-semibold dark:text-white">{user.userName}</h3>
                    <p className="text-gray-600 text-sm dark:text-gray-100">{user.bio}</p>
                    {
                        user.mutualFollowersCount > 0 && (
                            <p className="text-xs mb-2 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-200 px-2 py-0.5 rounded-full w-fit">
                                {user.mutualFollowersCount} mutual connection{user.mutualFollowersCount !== 1 && "s"}
                            </p>
                        )
                    }
                </div>
            </div>
            {
                isFollowed ? (
                    <button disabled className="w-full bg-gray-300 dark:bg-slate-600 text-gray-600 dark:text-gray-300 py-1 rounded-lg transition-all mt-auto cursor-not-allowed">
                        Following
                    </button>
                ) : (
                    <button onClick={() => handleFollow()} className="w-full bg-blue-600 hover:bg-blue-800 text-white py-1 rounded-lg transition-all mt-auto">
                        Follow
                    </button>
                )
            }
        </div>
    );
}

const RecentlyJoinedUserCard = ({ user }: { user: RecentlyJoinedUserType }) => {
    const [isFollowed, setIsFollowed] = useState(user.isFollowed);

    const handleFollow = async () => {
        try {
            await userService.addFollower(user._id);
            setIsFollowed(true);
        }
        catch(err) {  
        }
    }

    return(
        <div key={user._id} className="relative border border-gray-200 dark:border-gray-800 dark:bg-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            {/* NEW Ribbon */}
            <span className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                NEW
            </span>

            {/* Content */}
            <div className="flex items-center gap-4 mb-4">
                {/* Avatar Placeholder */}
                <img src={user.profilePicture ? user.profilePicture : 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg'} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div>
                    <h3 className="text-md font-semibold dark:text-white">{user.userName}</h3>
                    <p className="text-gray-600 text-sm dark:text-gray-200">{user.bio}</p>
                    <p className="text-gray-600 text-sm dark:text-gray-200">Joined on: {istDateFormat(user.createdAt)}</p>
                </div>
            </div>

            {/* Action */}
            {
                isFollowed ? (
                    <button disabled className="w-full border border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg cursor-not-allowed opacity-70 flex items-center justify-center gap-2" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Following
                    </button>
                ) : (
                    <button onClick={() => handleFollow()} className="w-full border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-900 transition-all">
                        Follow
                    </button>
                )
            }
            
        </div>
    );
}

const SearchFriendSection = () => {
    const [query, setQuery] = useState("");
    const [searchUserPopup, setSearchUserPopup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUserType[]>([]);
    const [topProfessionals, setTopProfessionals] = useState<TopProfessionalsType[]>([]);
    const [recentlyJoined, setRecentlyJoined] = useState<RecentlyJoinedUserType[]>([]);

    const handleSearchBtn = () => {
        if(!query.trim()) {
            return;
        }
        setSearchUserPopup(true);
    }

    const getOverview = async () => {
        try {
            setLoading(true);
            const response = await userService.getUserOverview();
            const data = response.data;
            setSuggestedUsers(data.data.suggestedUser);
            setRecentlyJoined(data.data.recentlyJoined);
            setTopProfessionals(data.data.topProfessionals);
        }
        catch(err) {
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOverview();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto md:px-6">

            {
                loading && <SearchFriendLoading />
            }

            {
                !loading && (
                    <>
                        <div className="flex items-center gap-2 md:mb-8 mb-4">
                            <input
                            type="text"
                            placeholder="Search by user name or email"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button onClick={() => handleSearchBtn()} className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-xl transition-all">
                                Search
                            </button>
                        </div>

                        {
                            suggestedUsers.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4 dark:text-white">🤝 People You May Know</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {
                                        suggestedUsers.map((user) => (
                                            <SuggestedUserCard user={user} key={user._id} />
                                        ))
                                    }
                                    </div>
                                </div>
                            )
                        }

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 dark:text-white">🏆 Top Professionals</h2>
                            <div className="divide-y divide-gray-200 dark:divide-gray-500 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                            {topProfessionals.map((user, index) => (
                                <div
                                key={user._id}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 transition dark:bg-slate-800"
                                >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-500">
                                    #{index + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-md font-semibold dark:text-white">{user.userName}</h3>
                                        <p className="text-gray-600 text-sm dark:text-gray-200">{user.bio}</p>
                                        <p className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-200 px-2 py-0.5 rounded-full w-fit">
                                            {user.followerCount} followers
                                        </p>
                                    </div>
                                </div>
                                <Link to={`/user/${user._id}`} className="bg-blue-600 hover:bg-blue-800 transition-all text-white px-3 py-1 rounded-lg">
                                    View
                                </Link>
                                </div>
                            ))}
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-4 dark:text-white">🆕 Recently Joined</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recentlyJoined.map((user) => (
                                    <RecentlyJoinedUserCard user={user} key={user._id} />
                                ))}
                            </div>
                        </div>
                    </>
                )
            }

            {
                searchUserPopup && <SearchUserPopup setSearchUserPopup={setSearchUserPopup} query={query} setQuery={setQuery} />
            }
        </div>
    );
};

export default SearchFriendSection;
