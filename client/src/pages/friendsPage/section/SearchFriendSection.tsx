import { useState } from "react";
import SearchUserPopup from "../../../components/friendsPageComponent/SearchUserPopup";

const suggestedUsers = [
  { id: 101, name: "Aarav Mehta", headline: "Full Stack Dev at Google", mutual: 4 },
  { id: 102, name: "Priya Nair", headline: "Marketing Manager at Flipkart", mutual: 2 },
  { id: 103, name: "Karan Verma", headline: "Data Analyst at Deloitte", mutual: 1 },
];

const recentlyJoined = [
  { id: 201, name: "Riya Sen", headline: "Business Analyst at Accenture" },
  { id: 202, name: "Ankit Jain", headline: "Mobile Developer at Paytm" },
  { id: 203, name: "Sonal Yadav", headline: "HR Specialist at Infosys" },
];

const topProfessionals = [
  { id: 301, name: "Manish Gupta", headline: "CTO at Zomato", mutual: 12 },
  { id: 302, name: "Shreya Kapoor", headline: "AI Researcher at Microsoft", mutual: 9 },
  { id: 303, name: "Deepak Joshi", headline: "Senior Architect at Adobe", mutual: 8 },
];

const SearchFriendSection = () => {
    const [query, setQuery] = useState("");
    const [searchUserPopup, setSearchUserPopup] = useState<boolean>(false);

    const handleSearchBtn = () => {
        if(!query.trim()) {
            return;
        }
        setSearchUserPopup(true);
    }

    return (
        <div className="w-full max-w-4xl mx-auto md:px-6">
            {/* Search Bar */}
            <div className="flex items-center gap-2 md:mb-8 mb-4">
                <input
                type="text"
                placeholder="Search by user name or email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={() => handleSearchBtn()} className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-xl transition-all">
                    Search
                </button>
            </div>

            {/* Suggested Friends */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">🤝 People You May Know</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedUsers.map((user) => (
                    <div
                    key={user.id}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition dark:bg-slate-800 dark:border-gray-800 flex flex-col"
                    >
                        <div className="flex gap-4 items-center">
                            <img src={"https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg"} alt="" className="h-10 w-10 rounded-full object-cover" />
                            <div>
                                <h3 className="text-lg font-semibold dark:text-white">{user.name}</h3>
                                <p className="text-gray-600 text-sm dark:text-gray-100">{user.headline}</p>
                                <p className="text-gray-400 text-xs mb-2 dark:text-gray-100">
                                    {user.mutual} mutual connection{user.mutual !== 1 && "s"}
                                </p>
                            </div>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-800 text-white py-1 rounded-lg transition-all mt-auto">
                            Follow
                        </button>
                    </div>
                ))}
                </div>
            </div>

            {/* Top Professionals Section - Ranked List */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">🏆 Top Professionals</h2>
                <div className="divide-y divide-gray-200 dark:divide-gray-500 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                {topProfessionals.map((user, index) => (
                    <div
                    key={user.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition dark:bg-slate-800"
                    >
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-500">
                        #{index + 1}
                        </span>
                        <div>
                            <h3 className="text-md font-semibold dark:text-white">{user.name}</h3>
                            <p className="text-gray-600 text-sm dark:text-gray-200">{user.headline}</p>
                            <p className="text-gray-400 text-xs dark:text-gray-200">
                                {user.mutual} mutual connections
                            </p>
                        </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-800 transition-all text-white px-3 py-1 rounded-lg">
                        View
                    </button>
                    </div>
                ))}
                </div>
            </div>

            {/* Recently Joined Section - Grid Cards */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">🆕 Recently Joined</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentlyJoined.map((user) => (
                    <div
                        key={user.id}
                        className="relative border border-gray-200 dark:border-gray-800 dark:bg-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                        {/* NEW Ribbon */}
                        <span className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        NEW
                        </span>

                        {/* Content */}
                        <div className="flex items-center gap-4 mb-4">
                            {/* Avatar Placeholder */}
                            <img src={"https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg"} alt="" className="h-10 w-10 rounded-full object-cover" />
                            <div>
                                <h3 className="text-md font-semibold dark:text-white">{user.name}</h3>
                                <p className="text-gray-600 text-sm dark:text-gray-200">{user.headline}</p>
                                <p className="text-gray-600 text-sm dark:text-gray-200">Joined on: 12/2/4</p>
                            </div>
                        </div>

                        {/* Action */}
                        <button className="w-full border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-900 transition-all">
                            Follow
                        </button>
                    </div>
                    ))}
                </div>
            </div>


            {
                searchUserPopup && <SearchUserPopup setSearchUserPopup={setSearchUserPopup} query={query} setQuery={setQuery} />
            }
        </div>
    );
};

export default SearchFriendSection;
