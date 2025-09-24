import { useState, forwardRef } from "react";
import { userService } from "../../service/user.service";
import { type UserProfileCardType } from "../../types/UserProfileCardType";
import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";

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
        <div
        ref={ref}
        className="w-full max-w-sm md:w-[24rem] border rounded-xl p-3 md:p-5 shadow-md hover:shadow-xl transition bg-white dark:bg-slate-800 flex flex-col dark:border-none"
        >
        {/* User details */}
        <div className="flex items-center">
            <img
            src={
                user.userProfile.profilePicture
                ? user.userProfile.profilePicture
                : "https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg"
            }
            alt="profile"
            className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border"
            />
            <div className="ml-3 md:ml-4 flex-1">
            <Link to={`/user/${user.userProfile._id}`} className="font-semibold text-sm md:text-lg text-gray-900 hover:underline cursor-pointer w-fit dark:text-white">
                {user.userProfile.userName}
            </Link>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-200">
                {user.userProfile.email}
            </p>
            <p className="text-green-600 text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1">
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500 animate-pulse inline-block" />
                Online
            </p>
            </div>
            <div className="text-center text-gray-700 dark:text-gray-200">
            <p className="font-bold text-sm md:text-lg">{followerCount}</p>
            <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-300">
                Followers
            </p>
            </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 my-3 md:my-4">
            {user.userProfile.skill.slice(0, 3).map((skill: string, index: number) => (
            <span
                key={index}
                className={`cursor-pointer px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full font-medium ${skillColor[index]}`}
            >
                #{skill}
            </span>
            ))}
        </div>

        {/* Bio */}
        <p className="text-xs md:text-sm text-gray-700 dark:text-white mb-2 md:mb-3 line-clamp-2">
            {user.userProfile.bio}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
            {user.userProfile.badges.slice(0, 3).map((badge: any, index: number) => (
            <div
                key={index}
                className="px-2 md:px-3 py-0.5 md:py-1 flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-medium text-[10px] md:text-xs shadow-sm cursor-pointer"
            >
                <img src={badge.icon} alt="badge" className="h-4 w-4 md:h-5 md:w-5" />
                {badge.name}
            </div>
            ))}
        </div>

        {/* Website */}
        {user.userProfile.website && (
            <a
            href={user.userProfile.website}
            target="__blank"
            className="mb-3 md:mb-4 text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium underline"
            >
            View my website
            </a>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
            <button
            onClick={() => handleFollow()}
            className={`flex-1 ${
                isFollowed
                ? "bg-red-600 hover:bg-red-800"
                : "bg-blue-600 hover:bg-blue-800"
            } transition-all px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-white font-bold rounded-lg md:rounded-xl shadow-sm`}
            >
            {isFollowed ? "Unfollow" : "Follow"}
            </button>
            <button className="flex-1 flex justify-center items-center gap-1 bg-gray-100 hover:bg-gray-200 dark:bg-white dark:hover:bg-gray-200 px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg md:rounded-xl text-xs md:text-sm text-gray-700 dark:text-gray-900 font-medium transition-all">
            <MdOutlineMessage className="text-sm md:text-lg" />
            Message
            </button>
        </div>
        </div>

    );
});

export default UserProfileCard