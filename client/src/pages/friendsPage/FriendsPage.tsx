import { useState, useEffect } from "react"

import FollowersSections from "./section/FollowersSection";
import FollowingSection from "./section/FollowingSection";
import SearchFriendSection from "./section/SearchFriendSection";

import { userService } from "../../service/user.service";

const FriendsPage = () => {
    
    const [tab, setTab] = useState<'Followers'|'Following'|'Search'>('Followers');

    const [followersCount, setFollowersCount] = useState<number>(0);
    const [followingCount, setFollowingCount] = useState<number>(0);
    const [mutualCount, setMutualCount] = useState<number>(0);

    const getConnectionStat = async () => {
        try {
            const response = await userService.getConnectionStat();
            const data = response.data;
            setFollowersCount(data.data.followersCount);
            setFollowingCount(data.data.followingCount);
            setMutualCount(data.data.mutualCount);
        }
        catch(err: any) {
            
        }
    }

    useEffect(() => {
        getConnectionStat();
    }, []);
    
    return (
        <div className="md:p-6 p-3">
            <header className="flex max-sm:flex-col max-sm:gap-2 items-center md:mb-6 mb-3">
                <div className="max-sm:w-full max-sm:px-4">
                    <h1 className="font-bold text-xl md:text-3xl dark:text-white">Connections</h1>
                    <p className="max-sm:text-xs text-gray-500 dark:text-gray-200">Discover and manage the minds you connect with.</p>
                </div>
                <div className="flex-grow flex h-fit justify-center gap-4">
                    <p className="px-3 py-1 text-sm rounded-full cursor-pointer bg-blue-50 text-blue-700 font-bold">Followers: {followersCount}</p>
                    <p className="px-3 py-1 text-sm rounded-full cursor-pointer bg-emerald-50 text-emerald-700 font-bold">Following: {followingCount}</p>
                    <p className="px-3 py-1 text-sm rounded-full cursor-pointer bg-amber-50 text-amber-700 font-bold">Mutual: {mutualCount}</p>
                </div>
            </header>


            <div className="flex gap-6 md:mb-6 mb-3 border-b dark:border-b-gray-700">
                {
                    ['Followers', 'Following', 'Search'].map((t, index) => (
                        <button onClick={() => setTab(t as 'Followers'|'Following'|'Search')} className={`pb-2 font-medium -mb-px transition-colors ${
                            tab === t ?
                            'border-b-2 border-blue-500 text-blue-600 dark:text-blue-500' :
                            'text-gray-500 hover:text-gray-700 dark:text-gray-200'
                        }`} key={index}>
                            {t}
                        </button>
                    ))
                }
            </div>

            {
                tab === 'Followers' && <FollowersSections />
            }
            {
                tab === 'Following' && <FollowingSection setTab={setTab}/>
            }
            {
                tab === 'Search' && <SearchFriendSection />
            }

        </div>
    )
}

export default FriendsPage