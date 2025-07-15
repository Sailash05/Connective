import { Link } from "react-router-dom";

import { FaUserCircle, FaLayerGroup, FaUserFriends, FaPhotoVideo, FaRobot } from "react-icons/fa";

const steps = [
    {
        icon: <FaUserCircle size={22} />,
        title: "Create Your Profile",
        description: "Sign up and personalize your profile to showcase who you are."
    },
    {
        icon: <FaLayerGroup size={22} />,
        title: "Discover Communities",
        description: "Browse and join groups based on your interests and passions."
    },
    {
        icon: <FaUserFriends size={22} />,
        title: "Connect with People",
        description: "Follow like-minded members and start meaningful conversations."
    },
    {
        icon: <FaPhotoVideo size={22} />,
        title: "Share Your Content",
        description: "Post photos, videos, resources, and helpful insights."
    },
    {
        icon: <FaRobot size={22} />,
        title: "Get Smart Suggestions",
        description: "Let AI recommend connections and communities for you."
    }
];

const HowItWorksSection = () => {
    return (
        <section className="w-[90%] md:w-[70%] mx-auto pt-12 md:pt-20 pb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 dark:text-white">How It Works</h2>
            <p className="text-gray-500 dark:text-gray-200 text-center max-w-xl mx-auto mb-12 max-sm:text-sm">Follow these simple steps to start connecting with people who match your mindset.</p>


            <div className="md:flex">
                {/* Left side content */}
                <div className="max-sm:pl-2 md:w-1/2 flex flex-col justify-center md:pr-8">
                    <p className="text-blue-600 dark:text-blue-500 font-extrabold uppercase tracking-wide mb-2 text-xs md:text-sm">
                        Get started
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight md:mb-2 dark:text-white">
                        Build meaningful connections
                    </h1>
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-500 leading-tight mb-4">
                        in minutes
                    </h1>

                    <p className="text-gray-600 dark:text-gray-200 text-sm mb-4 md:mb-6">
                        Create your profile, join interest-based communities, and share photos,
                        videos, and resources that matter to you. Connective makes it effortless
                        to meet people who think like you do.
                    </p>

                    <Link to='/auth' className="w-fit bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-blue-800 transition-all cursor-pointer">
                        Join Connective Free
                    </Link>
                </div>


                {/* Right side content */}
                <div className="relative border-l-4 border-blue-600 ml-4 space-y-8 md:space-y-12 md:w-1/2 mt-8 md:mt-0">
                    {
                        steps.map((step, index) => (
                            <div key={index} className="relative pl-10 group ">
                                <span className="absolute -left-[1.5rem] top-1 bg-blue-600 text-white rounded-full p-2 shadow-md">
                                    {step.icon}
                                </span>
                                <h3 className="text-xl font-semibold mb-1 dark:text-white">{index + 1}. {step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-200 text-sm">{step.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
