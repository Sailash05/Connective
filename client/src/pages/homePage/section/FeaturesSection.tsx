import { FaUsers, FaImages, FaLayerGroup, FaComments, FaRobot, FaStar } from "react-icons/fa";

const features = [
    {
        icon: <FaUsers size={30} className="text-blue-600" />,
        title: "Connect with Like-Minded People",
        description: "Find and follow people who share your interests and goals."
    },
    {
        icon: <FaImages size={30} className="text-green-600" />,
        title: "Share Photos, Videos & Resources",
        description: "Upload and exchange multimedia content with your network."
    },
    {
        icon: <FaLayerGroup size={30} className="text-yellow-600" />,
        title: "Join Communities & Groups",
        description: "Discover and participate in topic-based communities."
    },
    {
        icon: <FaComments size={30} className="text-purple-600" />,
        title: "Real-Time Chat & Feedback",
        description: "Engage in live conversations and meaningful discussions."
    },
    {
        icon: <FaRobot size={30} className="text-pink-600" />,
        title: "AI-Powered Recommendations",
        description: "Get personalized content suggestions powered by AI."
    },
    {
    icon: <FaStar size={30} className="text-orange-500" />,
    title: "Earn Recognition & Badges",
    description: "Get rewarded for your activity and build your credibility in the community."
    }
];

const FeaturesSection = ({ id }: { id: string }) => {
    return (
        <section id={id} className="scroll-mt-8 md:scroll-mt-24 pt-12 md:pt-4 w-11/12 max-w-6xl mx-auto text-center ">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Platform Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {
                    features.map((feature, index) => (
                        <div key={index} className="rounded-2xl shadow-lg p-3 md:p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <div className="mb-2 md:mb-4">{feature.icon}</div>
                            <h3 className="text-md md:text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default FeaturesSection;
