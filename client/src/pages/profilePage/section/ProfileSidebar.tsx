import { Link } from "react-router-dom";
import type { ProfileViewersType } from "../../../types/userType";

const ProfileSidebar = ({ profileViewers }: { profileViewers: ProfileViewersType[] }) => {
    return (
        <div className="space-y-6 mb-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold dark:text-white mb-3">Recent Viewers</h2>
                {
                    profileViewers.length === 0 && (<p className="text-gray-500 italic dark:text-gray-200">No recent viewers.</p>)
                }
                <div className="space-y-3">
                {profileViewers.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                    <img
                        src={p.profilePicture}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <Link to={`/user/${p.userId}`} className="font-semibold text-sm dark:text-white hover:underline">{p.userName}</Link>
                        <p className="text-gray-500 dark:text-gray-200 text-xs">{p.email}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
