import React from "react";
import image from "../../assets/post3.jpg"; // <- use a new image for this blog
import { Link } from "react-router-dom";

export default function BlogPostPage3() {
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

          {/* Middle - Search Bar */}
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
                2
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
          alt="Understanding Async/Await in JavaScript"
          className="w-full h-64 object-cover rounded-md"
        />
        <h1 className="text-3xl font-extrabold mt-4">
          Understanding Async/Await in JavaScript
        </h1>
        <div className="text-sm text-gray-500 mt-2">By Geetha • 2025-09-27</div>

        <p className="mt-6 text-base leading-relaxed">
          JavaScript is single-threaded, which means it can only run one task at
          a time. To avoid blocking the main thread, it uses asynchronous
          programming. This is where <code>async/await</code> comes into play,
          making asynchronous code easier to read and maintain.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          Before async/await, developers had to rely on callbacks or chained
          promises. While powerful, those patterns often led to "callback hell"
          or deeply nested code. Async/await provides a cleaner syntax that
          looks synchronous but is non-blocking under the hood.
        </p>

        <pre className="bg-gray-100 dark:bg-gray-700 text-sm p-4 rounded-md overflow-auto mt-2">
{`function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data loaded!");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const data = await fetchData();
  console.log(data);
}

getData();`}
        </pre>

        <p className="mt-4 text-base leading-relaxed">
          In the above example, the <code>await</code> keyword pauses execution
          until the promise resolves, but it doesn’t block the main thread.
          Instead, it allows other code to continue running while waiting.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          One important rule: you can only use <code>await</code> inside{" "}
          <code>async</code> functions. Trying to use it outside will throw a
          syntax error.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          Error handling also becomes straightforward with{" "}
          <code>try/catch</code>. Instead of chaining{" "}
          <code>.catch()</code> blocks, you can wrap your awaited code in a{" "}
          <code>try</code> block and handle exceptions in <code>catch</code>.
        </p>

        <pre className="bg-gray-100 dark:bg-gray-700 text-sm p-4 rounded-md overflow-auto mt-2">
{`async function getUserData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await res.json();
    console.log(user);
  } catch (err) {
    console.error("Error fetching user:", err);
  }
}`}
        </pre>

        <p className="mt-6 text-base leading-relaxed font-semibold">
          Async/await makes asynchronous programming in JavaScript simple,
          readable, and much more enjoyable. If you’re still using only promises
          or callbacks, it’s time to embrace async/await.
        </p>
      </article>
    </div>
  );
}
