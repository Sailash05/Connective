import { useState } from "react";
import { userService } from "../../../service/user.service";
import { type UserProfileType, type LocationType, type ExperienceType } from "../../../types/userType";
import Experience from "../../../components/profilePageComponent/Experience";
import ExperienceInputPopup from "../../../components/profilePageComponent/ExperienceInputPopup";

const ProfileEditMode = ({
    profileData,
    setProfileData,
    setIsEditing,
}: {
    profileData: UserProfileType;
    setProfileData: (profileData: UserProfileType) => void;
    setIsEditing: (isEditing: boolean) => void;
}) => {

    // const [userName, setUserName] = useState<string>(profileData.userName);
    // const [email, setEmail] = useState<string>(profileData.email);
    const [bio, setBio] = useState<string | null>(profileData.bio);
    const [location, setLocation] = useState<LocationType | null>(profileData.location ?? null);
    const [website, setWebsite] = useState<string | null>(profileData.website);
    const [resume, setResume] = useState<string | null>(profileData.resume);
    const [skill, setSkill] = useState<string>(profileData.skill.join(', '));
    const [interest, setInterest] = useState<string>(profileData.interest.join(', '));
    const [experience, setExperience] = useState<ExperienceType[]>(profileData.experience);

    const [experiencePopup, setExperiencePopup] = useState<boolean>(false);
    const [experienceIndex, setExperienceIndex] = useState<number>(-1);
    const [experienceStatus, setExperienceStatus] = useState<'new' | 'edit'>();

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
        const updatedProfile: UserProfileType = {
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
            setIsEditing(false);
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
        <div>
            <form onSubmit={(e) => updateProfile(e)} className="mt-16 space-y-6 p-6 border rounded-xl shadow bg-white dark:bg-gray-800 dark:border-gray-700">

                <h3 className="dark:text-white font-extrabold text-lg">Username: {profileData.userName}</h3>
                <h3 className="dark:text-white font-extrabold text-lg">Email: {profileData.email}</h3>

            {/* <div>
                <label className="block text-sm font-medium dark:text-gray-300">
                Username
                </label>
                <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                />
            </div>

            <div>
                <label className="block text-sm font-medium dark:text-gray-300">
                Email
                </label>
                <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                />
            </div> */}

            {/* Bio */}
            <div>
                <label className="block text-sm font-medium dark:text-gray-300">
                    Bio
                </label>
                <textarea
                    name="bio"
                    value={bio || ""}
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
                value={website || ''}
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
                value={resume || ''}
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
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600" >
                    Cancel
                </button>
            </div>
            </form>
            {
                experiencePopup && <ExperienceInputPopup exp={experience} expIndex={experienceIndex} experienceStatus={experienceStatus ?? 'new'} setExperiencePopup={setExperiencePopup} />
            }
        </div>
        
    );
};

export default ProfileEditMode;
