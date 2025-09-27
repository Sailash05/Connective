import React from "react";

const ProfileSidebar = ({ user }: { user: any }) => {
  return (
    <div className="space-y-6">
      {/* Recent Viewers */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-3">Recent Viewers</h2>
        <div className="flex -space-x-3">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={user.profilePicture}
              alt="viewer"
              className="w-10 h-10 rounded-full border-2 border-white hover:z-10"
            />
          ))}
        </div>
      </div>

      {/* People Also Viewed */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-3">People Also Viewed</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((p) => (
            <div key={p} className="flex items-center gap-3">
              <img
                src={user.profilePicture}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm">Commander Data</p>
                <p className="text-gray-500 text-xs">Starfleet Officer</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
