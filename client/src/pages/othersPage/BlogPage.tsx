import { Link } from "react-router-dom";
import { blogPosts } from "../../constants/landingPageConstants";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* ================= HEADER ================= */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

          {/* Left - Brand */}
          <Link
            to="/home"
            className="text-2xl font-extrabold text-blue-600 dark:text-white tracking-wide"
          >
            connective
          </Link>

          {/* Middle - Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 dark:bg-gray-700 
                          placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none 
                          focus:ring-2 focus:ring-blue-500 transition"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-4">

            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <svg
                className="h-6 w-6 text-gray-600 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405M19 13V8a7 7 0 00-14 0v5l-1.405 1.405A1 1 0 005 17h14z"
                />
              </svg>
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>

            {/* Messages */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <svg
                className="h-6 w-6 text-gray-600 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z"
                />
              </svg>
            </button>

            {/* Go Home */}
            <Link
              to="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Go Home
            </Link>
          </div>

        </div>
      </header>

      {/* ================= BLOG LIST ================= */}
      <section className="py-10 w-11/12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 dark:text-white">
          From Our Blog
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-xl mx-auto mb-10">
          Explore helpful guides and resources to improve your development and design workflow.
        </p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {blogPosts.map((post, index) => (
            <Link
              to={post.link}
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg p-5 block hover:scale-[1.05] transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {post.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-3 mt-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {post.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default BlogPage;
