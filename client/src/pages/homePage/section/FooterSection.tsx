import { Link } from "react-router-dom";

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
        <footer className="bg-gray-900 text-gray-300 mt-16 pt-10 text-sm font-medium">
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
                    <div className="flex items-center gap-2 text-white mb-3">
                        <FaLink className="text-blue-500" /> <h4>Explore</h4>
                    </div>
                    <ul className="space-y-1">
                        <li><Link to='/home' className="hover:text-white hover:underline">Home</Link></li>
                        <li><a href="#reviews" className="hover:text-white hover:underline">Communities</a></li>
                        <li><a href="#blogs" className="hover:text-white hover:underline">Blog</a></li>
                        <li><a href="#career" className="hover:text-white hover:underline">Careers</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <div className="flex items-center gap-2 text-white mb-3">
                        <FaLifeRing className="text-green-400" /> <h4>Support</h4>
                    </div>
                    <ul className="space-y-1">
                        <li><a href="#faq" className="hover:text-white hover:underline">Help Center</a></li>
                        <li><a href="mailto:support@connective.com" className="hover:text-white hover:underline">Email Support</a></li>
                        <li><a href="#feedback" className="hover:text-white hover:underline">Feedback</a></li>
                        <li><a href="#newsletter" className="hover:text-white hover:underline">Newsletter</a></li>
                    </ul>
                </div>

                {/* Legal & Social */}
                <div>
                    <div className="flex items-center gap-2 text-white mb-3">
                        <FaShieldAlt className="text-pink-500" /> <h4>Legal</h4>
                    </div>
                    <ul className="space-y-1 mb-4">
                        <li><a href="#privacy-policy" className="hover:text-white hover:underline">Privacy Policy</a></li>
                        <li><a href="#terms" className="hover:text-white hover:underline">Terms of Use</a></li>
                    </ul>
                    <div className="flex gap-4 text-lg">
                        <a href="#facebook" className="hover:scale-110 transition text-[#1877F2]"> {/* Facebook Blue */}
                            <FaFacebookF />
                        </a>
                        <a href="https://x.com/Sailash05" target="_blank" className="hover:scale-110 transition text-[#1DA1F2]"> {/* Twitter Blue */}
                            <FaTwitter />
                        </a>
                        <a href="#instagram" className="hover:scale-110 transition text-[#C13584]"> {/* Instagram Gradient Pink */}
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/in/Sailash05/" target="_blank" className="hover:scale-110 transition text-[#0077B5]"> {/* LinkedIn Blue */}
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Strip */}
            <p className="text-center text-xs text-gray-500 py-4">
                © {new Date().getFullYear()} Connective. All rights reserved.
            </p>
        </footer>
    );
};

export default FooterSection;
