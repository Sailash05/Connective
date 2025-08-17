import { useState, useEffect } from "react"

import FollowersSections from "./section/FollowersSection";
import FollowingSection from "./section/FollowingSection";
import SuggestedSections from "./section/SuggestedSections";

import { userService } from "../../service/user.service";

const FriendsPage = () => {
    
    const [tab, setTab] = useState<string>('Followers');

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
        <div className="p-6">
            <header className="flex items-center mb-6">
                <div>
                    <h1 className="font-bold text-3xl">Connections</h1>
                    <p className="text-gray-500">Discover and manage the minds you connect with.</p>
                </div>
                <div className="flex-grow flex h-fit justify-center gap-4">
                    <p className="px-3 py-1 text-sm rounded-full cursor-pointer bg-blue-50 text-blue-700">Followers: {followersCount}</p>
                    <p className="px-3 py-1 text-sm rounded-full cursor-pointer bg-emerald-50 text-emerald-700">Following: {followingCount}</p>
                    <p className="px-3 py-1 text-sm rounded-full cursor-pointer bg-amber-50 text-amber-700">Mutual: {mutualCount}</p>
                </div>
            </header>


            <div className="flex gap-6 mb-6 border-b">
                {
                    ['Followers', 'Following', 'Suggested'].map((t, index) => (
                        <button onClick={() => setTab(t)} className={`pb-2 font-medium -mb-px transition-colors ${
                            tab === t ?
                            'border-b-2 border-blue-500 text-blue-600' :
                            'text-gray-500 hover:text-gray-700'
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
                tab === 'Following' && <FollowingSection />
            }
            {
                tab === 'Suggested' && <SuggestedSections />
            }

        </div>
    )
}

export default FriendsPage