import { useEffect, useState } from "react";
import { userService } from "../service/user.service";
import { type TopProfessionalsType } from "../types/userType";
import { FaBolt, FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";

type Abcd = {
    _id: string,
    content: string
}

const RightSidebar = () => {
    const trendingPosts = [
        "Top Skills to Learn in 2025",
        "Should You Join Remote Communities?",
        "Networking Tips That Work"
    ];

    const recommendedCommunities = ["Productivity Gurus", "Career Switchers", "Tech Founders"];

    const blogSnippets = [
        "📘 How to Build a Career Roadmap",
        "🧠 The Power of Consistent Learning"
    ];

    const suggestions = [
        { name: "Priya Sharma", mutuals: 3 },
        { name: "Karan Patel", mutuals: 1 },
        { name: "Anjali Rao", mutuals: 4 }
    ];

    const [topProfessionals, setTopProfessionals] = useState<TopProfessionalsType[]>([]);
    const [topPost, setTopPost] = useState<Abcd[]>([]);

    const getOverview = async () => {
        try {
            const response = await userService.getUserOverview();
            const data = response.data;
            setTopProfessionals(data.data.topProfessionals);
            const response2 = await userService.temp();
            const data2 = response2.data;
            console.log(data2);
            setTopPost(data2.data);

        }
        catch(err) {
        }
    }

    useEffect(() => {
        getOverview();
    }, []);

    return (
        <aside className="w-full h-full py-4 px-6 bg-white border-l border-gray-300 dark:border-gray-600 overflow-y-auto space-y-6 text-sm hide-scrollbar dark:bg-slate-950">

            {/* User Summary */}
            <div className="p-4 rounded-lg bg-blue-50 shadow-sm dark:bg-slate-800 dark:shadow-slate-900">
                <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-lg mb-1">Welcome back!</h3>
                <p className="text-gray-500 dark:text-gray-200 text-sm">Keep growing, you're doing great! 🚀</p>
            </div>

            {/* Trending Posts */}
            <div>
                <h4 className="text-gray-700 dark:text-white font-semibold mb-2">🔥 Trending Posts</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-100">
                {topPost.map((post, idx) => (
                    <div>
                        <Link to={`/post/${post._id}`} key={idx} className="hover:underline cursor-pointer">{post.content.slice(0, 50)}</Link>

                    </div>
                ))}
                </ul>
            </div>

            {/* Recommended Communities */}
            {/* <div>
                <h4 className="text-gray-700 dark:text-white font-semibold mb-2">🧠 Recommended Communities</h4>
                <ul className="space-y-1 text-blue-600 dark:text-blue-500">
                {recommendedCommunities.map((community, idx) => (
                    <li key={idx} className="hover:underline cursor-pointer">#{community}</li>
                ))}
                </ul>
            </div> */}

            {/* People You May Know */}
            <div>
                <h4 className="text-gray-700 dark:text-white font-semibold mb-2">👥 Top Professionals</h4>
                <ul className="space-y-2">
                {topProfessionals.map((user, idx) => (
                    <li key={idx} className="flex justify-between items-center cursor-pointer">
                    <Link to={`/user/${user._id}`} className="text-gray-700 dark:text-white">{user.userName}</Link>
                    <span className="text-xs text-gray-400 dark:text-gray-300">{user.followerCount} followers</span>
                    </li>
                ))}
                </ul>
            </div>

            {/* Blog Snippets */}
            <div>
                <h4 className="text-gray-700 dark:text-white font-semibold mb-2">📰 Blog Snippets</h4>
                <div className="space-y-1 text-gray-600 dark:text-gray-100 flex flex-col">
                    <Link to={'/blog/typescript-react'} className="hover:underline cursor-pointer">📈 Functions of react with typescript.</Link>
                    <Link to={'/blog/designing-component'} className="hover:underline cursor-pointer">🧠 Mastering React Hooks for Beginners.</Link>
                    <Link to={'/blog/deployment'} className="hover:underline cursor-pointer">📘 Understanding Async/Await in JavaScript.</Link>
                </div>
            </div>

            {/* Quick Tools */}
            <div className="space-y-2">
                <Link to={'/comming-soon'} className="w-full flex items-center gap-2 justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold transition">
                <FaCrown /> Resume Builder
                </Link>
                <Link to={'/comming-soon'} className="w-full flex items-center gap-2 justify-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full font-semibold transition">
                <FaBolt /> Mock Test Zone
                </Link>
            </div>

            {/* Announcement */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                <h4 className="text-red-600 font-semibold">📣 New!</h4>
                <p className="text-gray-700 text-sm mt-1">AI Community Bot launching soon. Stay tuned!</p>
            </div>
        </aside>
    );
};

export default RightSidebar;
