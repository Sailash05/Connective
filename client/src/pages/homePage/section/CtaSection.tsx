import { FaCheckCircle } from "react-icons/fa";


const CtaSection = () => {
    return (
        <section className="py-8 md:py-16 px-6 border-t border-b border-gray-200 dark:border-gray-900">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                
                {/* Left Section */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 md:mb-4 dark:text-white">
                        Ready to Connect and Grow?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200 text-md md:text-lg mb-6">
                        Join thousands of individuals forming real connections, learning from each other, and creating impact in communities that matter.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-full cursor-pointer font-semibold transition-all">
                            Get Started for Free
                        </button>
                        <button className="border dark:bg-gray-200 dark:hover:bg-gray-300 border-blue-600 hover:bg-blue-50 transition-all text-blue-600 px-6 py-3 rounded-full cursor-pointer font-semibold">
                            Explore Communities
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <FaCheckCircle className="text-green-500 text-xl mt-1" />
                            <p className="text-gray-700 dark:text-gray-200">
                                Access a variety of interest-based communities instantly.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaCheckCircle className="text-green-500 text-xl mt-1" />
                            <p className="text-gray-700 dark:text-gray-200">
                                Share ideas, photos, videos, and resources easily.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaCheckCircle className="text-green-500 text-xl mt-1" />
                            <p className="text-gray-700 dark:text-gray-200">
                                Get AI-powered recommendations tailored to your interests.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaCheckCircle className="text-green-500 text-xl mt-1" />
                            <p className="text-gray-700 dark:text-gray-200">
                                Join for free — no commitment or credit card required.
                            </p>
                        </li>
                    </ul>
                </div>
                
            </div>
        </section>
    );
};

export default CtaSection;
