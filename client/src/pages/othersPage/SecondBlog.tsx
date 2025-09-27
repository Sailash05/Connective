import React from "react";
import image from "../../assets/post2.jpg"; // <- use a new image for this blog
import { Link } from "react-router-dom";

export default function BlogPostPage2() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
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
                5
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

      {/* Blog Content */}
      <article className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm mt-6">
        <img
          src={image}
          alt="Mastering React Hooks for Beginners"
          className="w-full h-64 object-cover rounded-md"
        />
        <h1 className="text-3xl font-extrabold mt-4">
          Mastering React Hooks for Beginners
        </h1>
        <div className="text-sm text-gray-500 mt-2">By Sailash • 2025-09-27</div>

        <p className="mt-6 text-base leading-relaxed">
          React Hooks were introduced in React 16.8 and completely changed the
          way developers write React components. They let you use state and
          other React features without writing a class.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          The two most commonly used hooks are <code>useState</code> and{" "}
          <code>useEffect</code>. <code>useState</code> helps you manage local
          component state, while <code>useEffect</code> allows you to perform
          side effects like fetching data or updating the document title.
        </p>

        <pre className="bg-gray-100 dark:bg-gray-700 text-sm p-4 rounded-md overflow-auto mt-2">
{`import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click Me
      </button>
    </div>
  );
}`}
        </pre>

        <p className="mt-4 text-base leading-relaxed">
          With just a few lines of code, you can now handle both state
          management and side effects in a clean, functional way. No need for
          verbose lifecycle methods like <code>componentDidMount</code> or{" "}
          <code>componentDidUpdate</code>.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          Another powerful hook is <code>useContext</code>, which simplifies
          sharing state across multiple components without prop drilling. When
          combined with <code>useReducer</code>, you can build complex state
          management systems inside your app.
        </p>

        <p className="mt-6 text-base leading-relaxed">
          Hooks unlock a more functional style of programming in React. They
          encourage writing smaller, reusable logic pieces and make testing much
          easier.
        </p>

        <p className="mt-6 text-base leading-relaxed font-semibold">
          If you’re starting with React today, learning hooks is essential—they
          are the future of React development.
        </p>
      </article>
    </div>
  );
}
