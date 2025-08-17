import { useState, forwardRef } from "react";
import { userService } from "../../service/user.service";
import { type UserProfileCardType } from "../../types/UserProfileCardType";
import { MdOutlineMessage } from "react-icons/md";

type UserProfileProps = {
    user: UserProfileCardType;
};

const UserProfileCard = forwardRef<HTMLDivElement, UserProfileProps>(({ user }, ref) => {

    const [isFollowed, setIsFollowed] = useState<boolean>(user.isFollowed);
    const [followerCount, setFollowerCount] = useState<number>(user.userProfile.followerCount);

    const handleFollow = async () => {
        try {
            if(isFollowed) {
                await userService.unFollow(user.userProfile._id);
                setIsFollowed(false);
                setFollowerCount(prev => prev - 1);
            }
            else {
                await userService.addFollower(user.userProfile._id);
                setIsFollowed(true);
                setFollowerCount(prev => prev + 1);
            }
        }
        catch(err) {
        }
    }

    const skillColor = [
        'bg-blue-50 text-blue-700',
        'bg-purple-50 text-purple-700',
        'bg-green-50 text-green-700'
    ]
    return (
        <div ref={ref} className="w-[24rem] border rounded-2xl p-5 shadow-md hover:shadow-xl transition bg-white flex flex-col">
            
            {/* User details */}
            <div className="flex items-center">
                <img src={user.userProfile.profilePicture ? user.userProfile.profilePicture : 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg'} alt="profile" className="h-10 w-10 rounded-full object-cover border" />
                <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg text-gray-900 hover:underline cursor-pointer w-fit">{user.userProfile.userName}</h3>
                    <p className="text-sm text-gray-500">{user.userProfile.email}</p>
                    <p className="text-green-600 text-sm font-semibold flex items-center gap-2 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse inline-block" />
                        Online
                    </p>
                </div>
                <div className="text-center text-gray-700">
                    <p className="font-bold text-lg">{followerCount}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 my-4">
                {
                    user.userProfile.skill.slice(0,3).map((skill: string, index: number) => 
                        <span key={index} className={`cursor-pointer px-2 py-1 text-xs rounded-full font-medium ${skillColor[index]}`}>
                            #{skill}
                        </span>
                    )
                }
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {user.userProfile.bio}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                {
                    user.userProfile.badges.slice(0,3).map((badge: any, index: number) => 
                        <div key={index} className="px-3 py-1 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold text-xs shadow-sm cursor-pointer">
                            <img src={badge.icon} alt="badge" className="h-5 w-5" />
                            {badge.name}
                        </div>
                    )
                }
                
            </div>

            {/* Website */}
            {
                user.userProfile.website && (
                    <a href={user.userProfile.website} target="__blank" className="mb-4 text-blue-600 hover:text-blue-800 text-sm font-medium underline">
                        View my website
                    </a>
                )
            }

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
                <button onClick={() => handleFollow()} className={`flex-1 ${isFollowed ? 'bg-red-600 hover:bg-red-800' : 'bg-blue-600 hover:bg-blue-800' } transition-all px-4 py-2 text-white font-bold rounded-xl shadow-sm`}>
                    {
                        isFollowed ? 'Unfollow' : 'Follow'
                    }
                </button>
                <button className="flex-1 flex justify-center items-center gap-1 bg-gray-100 hover:bg-gray-200 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-medium">
                    <MdOutlineMessage className="text-lg" />
                    Message
                </button>
            </div>
        </div>
    );
});

export default UserProfileCard