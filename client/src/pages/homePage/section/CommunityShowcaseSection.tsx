import { FaQuoteLeft, FaStar } from 'react-icons/fa';

import { featuredCommunities, testimonials } from '../../../utils/landingPageConstants';

const CommunityShowcaseSection = ({ id }: { id: string }) => {
    return (
        <section id={id} className="scroll-mt-16 md:scroll-mt-20 pt-4 pb-10 w-11/12 max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 md:mb-6">Explore Communities & Hear from Members</h2>
            <p className="text-center text-gray-500 mb-8 md:mb-12 max-w-xl mx-auto">From tech geeks to book lovers - see what's happening and what users are saying.</p>

            {/* Featured Communities */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-20">
                {
                    featuredCommunities.map((community, index) => (
                        <div key={index} className={`p-6 rounded-xl shadow-md relative ${community.color}`}>
                            {
                                index === 0 && (
                                    <span className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                                        🏆 Top Rated
                                    </span>
                                )
                            }
                            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                                <span>{community.icon}</span> {community.name}
                            </h3>
                            <p className="text-sm">{community.description}</p>
                        </div>
                    ))
                }
            </div>

            {/* Testimonials */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                {
                    testimonials.map((t, index) => (
                        <div key={index} className="rounded-2xl shadow-md p-6 relative hover:scale-[1.05] transition-all duration-300 cursor-pointer">
                            <FaQuoteLeft className="absolute top-4 left-4 text-gray-300 text-xl" />
                            <div className="flex items-center gap-4 mb-4 mt-2">
                                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-semibold">{t.name}</h4>
                                    <div className="flex gap-1 text-yellow-400 text-sm">
                                    {
                                        Array(5).fill(0).map((_, i) => (
                                            <FaStar key={i} />
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{t.quote}</p>
                        </div>
                    ))
                }
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8 md:mt-16">
                <button className="bg-blue-600 px-6 py-3 rounded-full text-white font-semibold hover:bg-blue-800 transition cursor-pointer">
                Explore All Communities
                </button>
            </div>
        </section>
    );
};

export default CommunityShowcaseSection;
