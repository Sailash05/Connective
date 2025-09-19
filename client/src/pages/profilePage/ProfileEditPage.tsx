import { useState, useEffect } from "react";
import type { UserProfileType, LocationType, ExperienceType, UserProfileUpdateType } from "../../types/userType";
import { userService } from "../../service/user.service";

import Experience from "../../components/profilePageComponent/Experience";
import ExperienceInputPopup from "../../components/profilePageComponent/ExperienceInputPopup";

import { Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProfileEditPage = () => {
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState<UserProfileType>();

    const [profilePicture, setProfiePicture] = useState<string>('https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg');
    const [bannerPicture, setBannerPicture] = useState<string>('');

    const [bio, setBio] = useState<string>('');
    const [location, setLocation] = useState<LocationType | null>(null);
    const [website, setWebsite] = useState<string>('');
    const [resume, setResume] = useState<string>('');
    const [skill, setSkill] = useState<string>('');
    const [interest, setInterest] = useState<string>('');
    const [experience, setExperience] = useState<ExperienceType[]>([]);

    const [experiencePopup, setExperiencePopup] = useState<boolean>(false);
    const [experienceIndex, setExperienceIndex] = useState<number>(-1);
    const [experienceStatus, setExperienceStatus] = useState<'new' | 'edit'>();

    const getProfile = async () => {
        try {
            const response = await userService.getProfile();
            const data = response.data;
            const profile = data.data;
            setProfileData(profile);
            setProfiePicture(profile.profilePicture ? profile.profilePicture : 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg');
            setBannerPicture(profile.bannerPicture ? profile.bannerPicture : '');

            setBio(profile.bio || '');
            setLocation(profile.location || null);
            setWebsite(profile.website || '');
            setResume(profile.resume || '');
            setSkill(profile.skill.join(', '));
            setInterest(profile.interest.join(', '));
            setExperience(profile.experience);
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

    const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append('profilePicture', file);
            try {
            const response = await userService.updateProfilePicture(formData);
            const data = response.data;
            setProfiePicture(data.data.newProfilePicture);
            }
            catch(err) {

            }
        }
    };

    const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append('bannerPicture', file);
            try{
                const response = await userService.updateBannerPicture(formData);
                const data = response.data;
                setBannerPicture(data.data.newBannerPicture);
            }
            catch(err) {

            }
        }
    };

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        const skillArr: string[] = skill
            .split(",")
            .map((sk) => sk.trim())
            .filter((sk) => sk.length > 0);

        const interestArr: string[] = interest
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i.length > 0);

        const cleanedLocation: LocationType | null = location
            ? {
                city: location.city?.trim(),
                state: location.state?.trim(),
                country: location.country?.trim(),
            }
            : null;

        // Build updated user profile object
        const updatedProfile: UserProfileUpdateType = {
            _id: profileData._id, // keep id
            userName: profileData.userName, // not editable in this form?
            email: profileData.email, // not editable in this form?
            bio: bio?.trim() ?? null,
            profilePicture: profileData.profilePicture,
            bannerPicture: profileData.bannerPicture,
            location: cleanedLocation,
            website: website ?? null,
            resume: resume ?? null,
            skill: skillArr,
            interest: interestArr,
            experience: experience,
        };

        try {
            const response = await userService.updateProfile(updatedProfile);
            const data = response.data;
            setProfileData(data.data);
            // navigate to '/user'
            navigate('/user')

        }
        catch (err) {
            console.error("Update profile failed:", err);
        }
    };

    const handleExperience = (status: 'new' | 'edit', index: number = -1) => {
        setExperienceStatus(status)
        setExperienceIndex(index);
        setExperiencePopup(true);
    }
    const deleteExperience = (index: number) => {
        let newArr = experience.filter((_, i) => i !== index);
        setExperience(newArr);
    }

    return (
        <div className="max-w-4xl mx-auto p-3 md:p-6 space-y-10">
            <div className="relative">
                {/* Banner */}
                <div className="h-28 sm:h-36 md:h-48 lg:h-56 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-md overflow-hidden">
                    <img src={bannerPicture} className="h-full w-full object-cover" alt="Banner" />
                    {/* Banner edit button */}
                    <label className="absolute top-2 right-2 bg-black/50 p-2 rounded-full cursor-pointer hover:bg-black/70">
                        <Camera size={18} className="text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleBannerChange(e)} />
                    </label>
                </div>

                {/* Profile Image */}
                <div className="absolute -bottom-10 left-4 sm:left-6 z-10">
                    <div className="relative">
                        <img src={profilePicture} alt="Profile" className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg" />
                        {/* Profile edit button */}
                        <label className="absolute bottom-1 right-1 bg-black/50 p-2 rounded-full cursor-pointer hover:bg-black/70">
                            <Camera size={16} className="text-white" />
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleProfilePictureChange(e)} />
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <form onSubmit={(e) => updateProfile(e)} className="mt-16 space-y-6 p-3 md:p-6 border rounded-xl shadow bg-white dark:bg-gray-800 dark:border-gray-700">

                    <h3 className="dark:text-white font-extrabold text-lg">Username: {profileData.userName}</h3>
                    <h3 className="dark:text-white font-extrabold text-lg">Email: {profileData.email}</h3>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={bio}
                            onChange={(e) => {
                            if (e.target.value.length <= 500) {
                                setBio(e.target.value);
                            }
                            }}
                            rows={3}
                            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                        ></textarea>
                        <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                            {bio?.length || 0}/500 characters
                        </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 capitalize">City</label>
                            <input
                            type="text"
                            name='city'
                            value={location?.city}
                            onChange={(e) => setLocation((loc) => ({
                                ...(loc ?? {}),
                                city: e.target.value
                            }))}
                            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 capitalize">State</label>
                            <input
                            type="text"
                            name='state'
                            value={location?.state}
                            onChange={(e) => setLocation((loc) => ({
                                ...(loc ?? {}),
                                state: e.target.value
                            }))}
                            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 capitalize">Country</label>
                            <input
                            type="text"
                            name='country'
                            value={location?.country}
                            onChange={(e) => setLocation((loc) => ({
                                ...(loc ?? {}),
                                country: e.target.value
                            }))}
                            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                            />
                        </div>
                    </div>

                {/* Website */}
                <div>
                    <label className="block text-sm font-medium dark:text-gray-300">
                    Website
                    </label>
                    <input
                    type="url"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                    />
                </div>

                {/* Resume */}
                <div>
                    <label className="block text-sm font-medium dark:text-gray-300">
                    Resume Link
                    </label>
                    <input
                    type="url"
                    name="resume"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                    />
                </div>

                {/* Skills */}
                <div>
                    <label className="block text-sm font-medium dark:text-gray-300">
                    Skills (comma separated)
                    </label>
                    <input
                    type="text"
                    name="skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                    />
                </div>

                {/* Interests */}
                <div>
                    <label className="block text-sm font-medium dark:text-gray-300">
                    Interests (comma separated)
                    </label>
                    <input
                    type="text"
                    name="interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                    />
                </div>

                {/* Experience */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium dark:text-gray-300">
                            Experience
                        </label>
                        <button type="button" onClick={() => handleExperience('new')} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            + Add Experience
                        </button>
                    </div>
                    {/* Experience container */}
                    <div className="space-y-4">
                        {
                            experience.map((exp, index) => (
                                <Experience key={index} experience={exp} handleExperience={handleExperience} expIndex={index} deleteExperience={deleteExperience} />
                            ))
                        }
                        {
                            experience.length === 0 && <p className="dark:text-white">No experience found!</p>
                        }
                    </div>

                </div>


                {/* Save & Cancel */}
                <div className="flex gap-4">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >
                        Save
                    </button>
                    <Link to={'/user'} type="button" className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600" >
                        Cancel
                    </Link>
                </div>
                </form>
                {
                    experiencePopup && <ExperienceInputPopup exp={experience} expIndex={experienceIndex} experienceStatus={experienceStatus ?? 'new'} setExperiencePopup={setExperiencePopup} />
                }
            </div>

        </div>
    )
}

export default ProfileEditPage