const blogPosts = [
  {
    title: "🧠 How to Find the Right Community",
    excerpt: "Discover simple strategies to connect with people who truly align with your interests and goals.",
    image: "https://picsum.photos/id/1015/400/240",
    link: "/blog/how-to-find-the-right-community",
    author: {
      name: "Aarav Mehta",
      avatar: "https://i.pravatar.cc/40?img=1"
    },
    date: "June 28, 2025"
  },
  {
    title: "📈 Tips to Grow Your Network",
    excerpt: "Learn how to expand your network effectively using tools, conversations, and shared interests.",
    image: "https://picsum.photos/id/1016/400/240",
    link: "/blog/grow-your-network",
    author: {
      name: "Sara Iqbal",
      avatar: "https://i.pravatar.cc/40?img=5"
    },
    date: "June 26, 2025"
  },
  {
    title: "💬 Starting Meaningful Conversations",
    excerpt: "From breaking the ice to staying engaged, master the art of digital conversation.",
    image: "https://picsum.photos/id/1018/400/240",
    link: "/blog/meaningful-conversations",
    author: {
      name: "Dev Raj",
      avatar: "https://i.pravatar.cc/40?img=8"
    },
    date: "June 22, 2025"
  }
];



const BlogSection = () => {
  return (
    <section className="w-11/12 max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">From Our Blog</h2>
      <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
        Get helpful guides and tips from our team to grow your network and community-building skills.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <a
            href={post.link}
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 block"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
            <div className="flex items-center gap-3 mt-4">
  <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
  <div>
    <p className="text-sm font-medium text-gray-800">{post.author.name}</p>
    <p className="text-xs text-gray-500">{post.date}</p>
  </div>
</div>

          </a>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
        >
          Read More Blogs
        </a>
      </div>
    </section>
  );
};

export default BlogSection;
