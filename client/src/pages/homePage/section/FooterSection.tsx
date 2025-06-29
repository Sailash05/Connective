import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaLink,
  FaLifeRing,
  FaShieldAlt,
} from "react-icons/fa";

const FooterSection = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-20 pt-10 text-sm font-medium">
            <div className="w-11/12 max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10 border-b border-gray-800 pb-5">
            
                {/* Brand */}
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-3">Connective</h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Connect. Collaborate. Grow with people who share your mindset.
                        Discover powerful communities and insightful conversations.
                    </p>
                </div>

                {/* Explore */}
                <div>
                    <h2 className="flex items-center gap-2 text-white mb-3">
                        <FaLink className="text-blue-500" /> Explore
                    </h2>
                    <ul className="space-y-1">
                        <li><a href="#" className="hover:text-white hover:underline">Home</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Communities</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Blog</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Careers</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h2 className="flex items-center gap-2 text-white mb-3">
                        <FaLifeRing className="text-green-400" /> Support
                    </h2>
                    <ul className="space-y-1">
                        <li><a href="#" className="hover:text-white hover:underline">Help Center</a></li>
                        <li><a href="mailto:support@connective.com" className="hover:text-white hover:underline">Email Support</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Feedback</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Newsletter</a></li>
                    </ul>
                </div>

                {/* Legal & Social */}
                <div>
                    <h2 className="flex items-center gap-2 text-white mb-3">
                        <FaShieldAlt className="text-pink-500" /> Legal
                    </h2>
                    <ul className="space-y-1 mb-4">
                        <li><a href="#" className="hover:text-white hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Terms of Use</a></li>
                    </ul>
                    <div className="flex gap-4 text-lg">
                        <a href="#" className="hover:scale-110 transition text-[#1877F2]"> {/* Facebook Blue */}
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:scale-110 transition text-[#1DA1F2]"> {/* Twitter Blue */}
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:scale-110 transition text-[#C13584]"> {/* Instagram Gradient Pink */}
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:scale-110 transition text-[#0077B5]"> {/* LinkedIn Blue */}
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Strip */}
            <div className="text-center text-xs text-gray-500 py-4">
                © {new Date().getFullYear()} Connective. All rights reserved.
            </div>
        </footer>
    );
};

export default FooterSection;
