import { type UserProfileType } from "../../../types/userType";

const ProfileViewMode = ({ profileData, setIsEditing }: { 
    profileData: UserProfileType,
    setIsEditing: (isEditing: boolean) => void
}) => {

    return(
        <div className="mt-16 space-y-8">
            {/* Name & Bio */}
            <div>
                <h1 className="text-3xl font-bold dark:text-gray-100">{profileData.userName}</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{profileData.bio}</p>
            </div>

            {/* Contact & Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">📧 Email</p>
                    <p className="font-medium dark:text-gray-200">{profileData.email}</p>
                </div>
                {
                    profileData.location && (profileData.location.city || profileData.location.country || profileData.location.state) && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">📍 Location</p>
                            <p className="font-medium dark:text-gray-200">
                                {profileData.location.city}, {profileData.location.state},{" "}
                                {profileData.location.country}
                            </p>
                        </div>
                    )
                }
                {
                    profileData.website && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">🔗 Website</p>
                            <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                {profileData.website}
                            </a>
                        </div>
                    )
                }
                {
                    profileData.resume && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">📄 Resume</p>
                            <a href={profileData.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                View Resume
                            </a>
                        </div>
                    )
                }
            </div>

            {/* Skills */}
            <div>
                <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
                💡 Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                {profileData.skill.map((s, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm rounded-full">{s}</span>
                ))}
                {
                    profileData.skill.length === 0 && ( <p className="dark:text-white">No skills found!</p>)
                }
                </div>
            </div>

            {/* Interests */}
            <div>
                <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
                🎯 Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                {profileData.interest.map((i, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm rounded-full">{i}</span>
                ))}
                {
                    profileData.interest.length === 0 && ( <p className="dark:text-white">No interest found!</p>)
                }
                </div>
            </div>

            {/* Experience */}
            <div>
  <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
    💼 Experience
  </h2>
  <div className="space-y-3">
    {profileData.experience.map((exp, index) => (
      <div
        key={index}
        className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            {exp.companyName}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(exp.from).toLocaleDateString()} –{" "}
            {exp.to ? new Date(exp.to).toLocaleDateString() : "Present"}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {exp.role} • {exp.type}
        </p>
      </div>
    ))}
    {profileData.experience.length === 0 && (
      <p className="dark:text-white">No experience found</p>
    )}
  </div>
</div>


            {/* Edit Button */}
            <div>
                <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

export default ProfileViewMode;