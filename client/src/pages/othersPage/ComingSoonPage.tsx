import React from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

const ComingSoonPage = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 text-center">
      <FiAlertCircle className="text-6xl text-yellow-500 mb-6" />
      <h1 className="text-4xl font-extrabold mb-4">Feature Coming Soon!</h1>
      <p className="text-lg mb-6 max-w-md">
        This feature is not available yet. We’re working hard to bring it to you soon. Stay tuned!
      </p>
      <Link
        to="/home"
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ComingSoonPage;
