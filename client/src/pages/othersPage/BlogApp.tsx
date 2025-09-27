import React from "react";
import image from "../../assets/post1.jpg";
import { Link } from "react-router-dom";

export default function BlogPostPage() {
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


      {/* Blog Content */}
      <article className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm mt-6">
        <img
          src={image}
          alt="Getting started with TypeScript + React"
          className="w-full h-64 object-cover rounded-md"
        />
        <h1 className="text-3xl font-extrabold mt-4">Getting started with TypeScript + React</h1>
        <div className="text-sm text-gray-500 mt-2">By Connective official • 2025-09-27</div>

        <p className="mt-6 text-base leading-relaxed">
          TypeScript brings static typing to JavaScript, making your code safer and easier to maintain.
          In this blog, we will cover how to set up a React project with TypeScript using Vite, add
          Tailwind CSS for styling, and create strongly typed components.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          First, initialize your project using <code>npm create vite@latest</code> and choose the
          React + TypeScript template. This gives you a modern and lightweight setup. After
          installing dependencies, you can start your dev server with <code>npm run dev</code>.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          Next, integrate Tailwind CSS by installing it via npm and configuring your <code>tailwind.config.js</code>.
          Add the Tailwind directives to your <code>index.css</code>. Now you can style components quickly
          with utility classes.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          Let’s create a simple typed component. Define an interface for props:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-700 text-sm p-4 rounded-md overflow-auto mt-2">
{`interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick} className="px-4 py-2 bg-blue-600 text-white rounded-md">
    {label}
  </button>
);`}
        </pre>

        <p className="mt-4 text-base leading-relaxed">
          With TypeScript, if you try to use this component without passing the required <code>label</code>
          or <code>onClick</code> props, the compiler will throw an error. This ensures better reliability
          and documentation in your code.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          Finally, when you’re ready to ship, build your project using <code>npm run build</code>.
          Deploy the output folder to services like Netlify or Vercel for free and easy hosting.
        </p>

        <p className="mt-6 text-base leading-relaxed">
          TypeScript with React might feel like extra effort at the start, but the long-term benefits
          are significant: fewer runtime errors, more confidence when refactoring, and overall cleaner
          and more maintainable code.
        </p>

        <p className="mt-6 text-base leading-relaxed font-semibold">
          That’s it! You’ve just walked through creating your first blog with React and TypeScript.
        </p>
      </article>
    </div>
  );
}