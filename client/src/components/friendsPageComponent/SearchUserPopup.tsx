import { useEffect, useState } from "react";
import SearchUserLoading from "../loadingComponent/userLoading/SearchUserLoading";
import NoUserFound from "./NoUserFound";
import { userService } from "../../service/user.service";
import { type UserSearchListType } from "../../types/userType";
import { IoClose } from "react-icons/io5";

const UserCard = ({user}: {user: UserSearchListType}) => {
    const [isFollowed, setIsFollowed] = useState<boolean>(user.isFollowed);

    const handleFollow = async () => {
        try {
            await userService.addFollower(user._id);
            setIsFollowed(true);
        }
        catch(err) {  
        }
    }

    return(
        <div key={user._id} className="flex max-sm:flex-col max-sm:gap-2 items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl p-2 md:p-4 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-slate-800 transition" >
            {/* Left - User Info with Avatar */}
            <div className="flex items-center gap-2 md:gap-4 w-full">
                <img src={user.profilePicture ? user.profilePicture : 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg'} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div>
                    <div className="text-md font-semibold text-gray-900 dark:text-white flex items-center">
                        <h3 className="hover:underline cursor-pointer">{user.userName}</h3>
                        <span className="text-xs text-gray-600 dark:text-gray-200 font-medium ml-2">
                            {user.email}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user.bio}</p>
                    {
                        user.mutualFollowersCount > 0 && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-200 rounded-full">
                                {user.mutualFollowersCount} mutual connections
                            </span>
                        )
                    }
                </div>
            </div>

            {/* Right - Actions */}
            <div className="flex gap-2 max-sm:w-full justify-center">
                <button className="flex-grow border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700 px-3 py-1 rounded-lg text-sm transition-all">
                    View
                </button>
                {
                    isFollowed ? (
                        <button disabled className="flex-grow bg-gray-300 dark:bg-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed px-3 py-1 rounded-lg text-sm">Following</button>
                    ) : (
                        <button onClick={() => handleFollow()} className="flex-grow bg-blue-600 hover:bg-blue-800 transition-all text-white px-3 py-1 rounded-lg text-sm">Follow</button>
                    )
                }
            </div>
        </div>
    );
}

const SearchUserPopup = ({setSearchUserPopup, query, setQuery}: {
    setSearchUserPopup: (value: boolean) => void,
    query: string,
    setQuery: (value: string) => void
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [userList, setUserList] = useState<UserSearchListType[]>([]);
    
    const handleCloseBtn = () => {
        setQuery('');
        setSearchUserPopup(false);
    }

    const getUserList = async () => {
        const limit: number = 30;
        try {
            setLoading(true);
            const response = await userService.getUserSearchList(query, limit);
            const data = response.data;
            setUserList(data.data);
        }
        catch(err) {
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserList();
    }, [])

    return (
        <div className="bg-black bg-opacity-25 dark:bg-opacity-30 w-[100dvw] h-[100dvh] fixed inset-0 flex justify-center items-center">
            <div className="bg-white dark:bg-slate-800 max-md:min-w-[90dvw] max-md:overflow-y-scroll max-md:space-y-2 md:w-[35dvw] w-[95dvw] h-[90dvh] p-3 max-sm:py-6 md:p-6 rounded-2xl flex flex-col">
                <div className="flex justify-between items-center md:mb-8 mb-4 max-md:px-2">
                    <h2 className="text-blue-600 dark:text-white font-bold text-2xl">Search User</h2>
                    <button onClick={() => handleCloseBtn()} className="bg-gray-200 hover:bg-gray-300 transition-all p-1 rounded-full">
                        <IoClose className="text-2xl text-gray-600" />
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-8">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by user name or email" className="flex-1 border border-gray-300 rounded-xl px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={() => getUserList()} className="bg-blue-600 hover:bg-blue-800 transition-all text-white px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base">
                        Search
                    </button>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {
                    loading && <SearchUserLoading />
                }
                {
                    !loading && (
                        userList.length > 0 ? (
                            userList.map((user) => (
                                <UserCard user={user} key={user._id} />
                            ))
                        ) : (
                            <NoUserFound />
                        )
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default SearchUserPopup