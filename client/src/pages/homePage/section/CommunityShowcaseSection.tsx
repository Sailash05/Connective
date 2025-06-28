import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const featuredCommunities = [
  {
    name: "Tech Enthusiasts",
    color: "bg-blue-100 text-blue-800",
    icon: "💻",
    description: "For people passionate about software, hardware, and innovation."
  },
  {
    name: "Book Readers",
    color: "bg-yellow-100 text-yellow-800",
    icon: "📚",
    description: "Join fellow readers and share your favorite reads."
  },
  {
    name: "Startup Founders",
    color: "bg-green-100 text-green-800",
    icon: "🚀",
    description: "Discuss ideas, funding, and growth with fellow founders."
  }
];

const testimonials = [
  {
    name: "Aarav Mehta",
    avatar: "https://i.pravatar.cc/100?img=1",
    quote: "Connective helped me meet amazing people who think like me!"
  },
  {
    name: "Sara Iqbal",
    avatar: "https://i.pravatar.cc/100?img=5",
    quote: "The communities here are super active and inspiring."
  },
  {
    name: "Dev Raj",
    avatar: "https://i.pravatar.cc/100?img=3",
    quote: "Great platform to collaborate and learn together."
  }
];

const CommunityShowcaseSection = () => {
  return (
    <section className="w-11/12 max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Explore Communities & Hear from Members</h2>
      <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
        From tech geeks to book lovers – see what’s happening and what users are saying.
      </p>

      {/* Featured Communities */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {featuredCommunities.map((community, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-md relative ${community.color}`}
          >
            {index === 0 && (
              <span className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                🏆 Top Rated
              </span>
            )}
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
              <span>{community.icon}</span> {community.name}
            </h3>
            <p className="text-sm">{community.description}</p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 relative hover:scale-[1.05] transition-all duration-300 cursor-pointer"
          >
            <FaQuoteLeft className="absolute top-4 left-4 text-gray-300 text-xl" />
            <div className="flex items-center gap-4 mb-4 mt-2">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold">{t.name}</h4>
                <div className="flex gap-1 text-yellow-400 text-sm">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{t.quote}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-16">
        <button className="bg-blue-600 px-6 py-3 rounded-full text-white font-semibold hover:bg-blue-800 transition cursor-pointer">
          Explore All Communities
        </button>
      </div>
    </section>
  );
};

export default CommunityShowcaseSection;
