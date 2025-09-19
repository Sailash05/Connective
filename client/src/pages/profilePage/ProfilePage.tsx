import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userService } from "../../service/user.service";
import { type UserProfileType } from "../../types/userType";

import Post from "../../components/feedPageComponent/feedComponent/Post";
import ProfileSidebar from "./section/ProfileSidebar";

import { Briefcase, MapPin, Globe, Users, FileText } from "lucide-react";

const ProfilePage = () => {
    const user = {
        userName: "Jean-Luc Picard",
        bio: "Starfleet Captain with years of leadership experience exploring the galaxy.",
        profilePicture: "https://res.cloudinary.com/djbmyn0fw/image/upload/v1757638626/connective_users/profile/68c36f8a6c854b771f85858d-profile.png",
        bannerPicture: "https://res.cloudinary.com/djbmyn0fw/image/upload/v1757691596/connective_users/banner/68c377b9cf6670a906a2451d-banner.jpg",
        location: { city: "Paris", country: "France" },
        skill: ["Leadership", "Diplomacy", "Exploration", "Strategy"],
        interest: ["Astronomy", "Starship Engineering", "History"],
        experience: [
        {
            companyName: "Starfleet",
            role: "Captain",
            type: "Full-time",
            from: "2364",
            to: "Present",
        },
        ],
        badges: [
        { name: "Leadership Award", icon: "⭐", awardedAt: "2365" },
        { name: "Explorer", icon: "🌌", awardedAt: "2370" },
        ],
        website: "https://starfleet.com",
        resume: "https://starfleet.com/resume.pdf",
        followerCount: 2500,
        followingCount: 180,
        isPremium: true,
        premiumData: { premiumPlan: "Gold" },
        posts: [
        {
            content: "Just completed another deep-space mission 🚀",
            fileData: [],
            tags: ["#exploration", "#starfleet"],
            likes: 120,
            comments: 12,
        },
        {
            content: "Leadership is about making the tough calls.",
            fileData: [],
            tags: ["#leadership", "#strategy"],
            likes: 300,
            comments: 40,
        },
        ],
    };

    const [profileData, setProfileData] = useState<UserProfileType>();

    const getProfile = async () => {
        try {
            const response = await userService.getProfile();
            const data = response.data;
            setProfileData(data.data);
        }
        catch(err) {

        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-950 min-h-screen">
            {/* Banner + Profile */}
            <div className="relative">

  {/* Banner */}
  <div className="h-28 sm:h-36 md:h-48 lg:h-56 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-md overflow-hidden">
    {profileData?.bannerPicture && (
      <img
        src={profileData.bannerPicture}
        alt="Banner"
        className="h-full w-full object-cover"
      />
    )}
  </div>

  {/* Profile Image */}
  <div className="absolute -bottom-10 left-4 sm:left-6 z-10">
    <img
      src={profileData?.profilePicture ? profileData?.profilePicture : 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg'}
      alt="Profile"
      className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg hover:shadow-2xl transition"
    />
  </div>
</div>


      <div className="max-w-5xl mx-auto px-4 pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">

            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 relative">
                <h1 className="text-2xl font-bold dark:text-white">{profileData?.userName}</h1>
                <p className="text-gray-600 dark:text-gray-200">{profileData?.bio}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2 flex-wrap dark:text-white">
                    <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> {profileData?.location?.city}, {profileData?.location?.country}
                    </span>
                    <a href={profileData?.website ? profileData?.website : ''} target="_blank" className="flex items-center text-blue-600 dark:text-blue-500 hover:underline">
                        <Globe className="w-4 h-4 mr-1" /> Website
                    </a>
                    <a href={profileData?.resume ? profileData?.resume : ''} target="_blank" className="flex items-center text-blue-600 dark:text-blue-500 hover:underline">
                        <FileText className="w-4 h-4 mr-1" /> Resume
                    </a>
                </div>

                <div className="flex items-center gap-6 mt-3 text-gray-700 dark:text-gray-200 text-sm">
                    <span className="font-semibold"><Users className="w-4 h-4 inline mr-1" /> {profileData?.followerCount} Followers</span>
                    <span>{profileData?.followingCount} Following</span>
                    {/* {user.isPremium && (
                        <span className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                            <Star className="w-4 h-4 mr-1 text-yellow-600" /> {user.premiumData.premiumPlan} Member
                        </span>
                    )} */}
                </div>

                {/* Edit & Saved Buttons */}
                <div className="mt-4 flex gap-3">
                    <Link to={'/user/edit'} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-800 transition-all">
                        Edit Profile
                    </Link>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 dark:text-gray-900 rounded-md shadow hover:bg-gray-300 transition-all">
                        View Saved Posts
                    </button>
                </div>
            </div>


            {/* About */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                <h2 className="text-lg dark:text-white font-semibold mb-3">About</h2>
                <p className="text-gray-700 dark:text-gray-100 leading-relaxed">{profileData?.bio}</p>
            </div>

            {/* Skills & Interests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-900">
                    <h2 className="text-lg font-semibold mb-3 dark:text-white">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {profileData?.skill.map((s, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-200 dark:bg-white hover:bg-gray-300 transition rounded-full text-sm cursor-pointer">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-900">
                    <h2 className="text-lg font-semibold mb-3 dark:text-white">Interests</h2>
                    <div className="flex flex-wrap gap-2">
                        {profileData?.interest.map((i, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 hover:bg-blue-200 transition text-blue-700 rounded-full text-sm cursor-pointer" >
                            {i}
                        </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Experience */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-3 dark:text-white">Experience</h2>
                <div className="border-l-2 border-gray-200 pl-4">
                    {profileData?.experience.map((exp, i) => (
                        <div key={i} className="mb-4">
                            <h3 className="font-semibold flex items-center dark:text-white">
                                <Briefcase className="w-4 h-4 mr-2 text-gray-600 dark:text-white" /> {exp.role} at {exp.companyName}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-100 text-sm">{exp.type} • {new Date(exp.from).toLocaleDateString()} - {new Date(exp.to).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements */}
            {/* <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-3">Achievements</h2>
                <div className="flex flex-wrap gap-3">
                    {user.badges.map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 border rounded-md hover:bg-gray-100 transition">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{badge.name}</span>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Your Posts */}
            <div className="bg-white rounded-xl py-4 dark:bg-slate-900 shadow-sm shadow-blue-100 dark:shadow-slate-800 space-y-4">
                <h2 className="text-lg font-bold mb-4 dark:text-white mx-6">Your Posts</h2>

                {profileData?.post ? (
                    <Post post={profileData.post} />
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 mx-6">
                        You haven&apos;t posted anything yet.
                    </p>
                )}

                {/* Centered Button */}
                <div className="flex justify-center">
                    <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-lg shadow transition-all font-medium text-white">
                        View or Edit Posts
                    </button>
                </div>
            </div>

          {/* Activity Feed */}
          {/* <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-3">Activity</h2>
            {user.posts.map((post, i) => (
              <div key={i} className="mb-4 border-b pb-4 last:border-none">
                <div className="flex items-center gap-2 mb-2">
                  <img src={user.profilePicture} className="w-8 h-8 rounded-full" />
                  <span className="font-semibold text-sm">{user.userName}</span>
                </div>
                <p>{post.content}</p>
                <div className="flex gap-2 mt-2">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs text-blue-600">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4 text-gray-500 text-sm mt-2">
                  <span className="cursor-pointer hover:text-blue-600">👍 {post.likes}</span>
                  <span className="cursor-pointer hover:text-blue-600">💬 {post.comments}</span>
                  <span className="cursor-pointer hover:text-blue-600">🔄 Share</span>
                </div>
              </div>
            ))}
          </div> */}


        </div>

        <ProfileSidebar user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
