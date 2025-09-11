import { useState, useEffect } from "react";
import { userService } from "../../service/user.service";
import { type UserProfileType } from "../../types/userType";
import ProfileViewMode from "./section/ProfileViewMode";
import ProfileEditMode from "./section/ProfileEditMode";

const MyProfilePage = () => {;

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<UserProfileType>();

    const getProfile = async () => {
        try {
            const response = await userService.getProfile();
            const data = response.data;
            // console.log(data.data);
            setProfileData(data.data);
        }
        catch(err) {

        }
    }
    
    useEffect(() => {
        getProfile();
    }, []);

    if (!profileData) {
        return <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-10">
            <div className="relative">
                <div className="h-40 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-md"></div>
                <div className="absolute -bottom-12 left-6">
                    <img src={profileData.profilePicture ? profileData.profilePicture : 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg'} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"/>
                </div>
            </div>

            {/* View Mode */}
            {!isEditing && (
                <ProfileViewMode profileData={profileData} setIsEditing={setIsEditing} />
            )}

            {/* Edit Mode */}
            {isEditing && (
                <ProfileEditMode 
                    profileData={profileData} 
                    setProfileData={setProfileData}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
};

export default MyProfilePage;
