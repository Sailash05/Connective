import { blogPosts } from "../../../constants/landingPageConstants";

const BlogSection = ({ id }: { id: string }) => {
    return (
        <section id={id} className="scroll-mt-12 md:scroll-mt-20 py-6 w-11/12 max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-6 dark:text-white">From Our Blog</h2>
            <p className="text-gray-500 dark:text-gray-200 text-center max-w-xl mx-auto mb-6 md:mb-12">
                Get helpful guides and tips from our team to grow your network and community-building skills.
            </p>

            <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                {
                    blogPosts.map((post, index) => (
                        <a href={post.link} key={index} className="bg-white dark:bg-slate-800  rounded-xl shadow-md hover:shadow-lg p-5 block hover:scale-[1.05] transition-all duration-300 dark:shadow-slate-900">
                            <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-md mb-4" />
                            <h3 className="text-lg font-semibold mb-2 dark:text-white">{post.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-200">{post.excerpt}</p>
                            <div className="flex items-center gap-3 mt-4">
                                <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{post.author.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-300">{post.date}</p>
                                </div>
                            </div>
                        </a>
                    ))
                }
            </div>

            <div className="text-center mt-6 md:mt-12">
                <a href="/blog" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition">Read More Blogs</a>
            </div>
        </section>
    );
};

export default BlogSection;
