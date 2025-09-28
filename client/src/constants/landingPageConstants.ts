type StatsDataItem = {
    label: string;
    value: string;
};

export const statsData: StatsDataItem[] = [
    {label: "Posts",value: "30+"},
    {label: "Users",value: "15+"},
    {label: "Resource", value: "20+"},
    {label: "Communities",value: "10+"},
    {label: "Groups",value: "15+"},
    {label: "Positive Feedbacks",value: "99%"}
]

type featuredCommunitiesItem = {
    name: string,
    color: string,
    icon: string,
    description: string
}

export const featuredCommunities: featuredCommunitiesItem[] = [
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

type TestimonialsItem = {
    name: string,
    avatar: string,
    quote: string
}

export const testimonials: TestimonialsItem[] = [
  {
    name: "Connective official",
    avatar: "https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg",
    quote: "Connective helped me meet amazing people who think like me!"
  },
  {
    name: "Sailash",
    avatar: "https://res.cloudinary.com/djbmyn0fw/image/upload/v1758975326/0f80b7dd-c3f8-4550-a4ef-3e0e59d60c3d_bwspxi.jpg",
    quote: "The communities here are super active and inspiring."
  },
  {
    name: "Geetha",
    avatar: "https://res.cloudinary.com/djbmyn0fw/image/upload/v1758975721/43055cca-14f5-47c8-a494-2e1dd74391d8_pvhhk4.jpg",
    quote: "Great platform to collaborate and learn together."
  }
];

type BlogPostsItems = {
    title: string,
    excerpt: string,
    image: string,
    link: string,
    author: {
        name: string;
        avatar: string;
    },
    date: string
}

export const blogPosts: BlogPostsItems[] = [
  {
    title: "📈  Functions of react with typescript.",
    excerpt: "TypeScript brings static typing to JavaScript, making your code safer and easier to maintain.",
    image: "https://picsum.photos/id/1015/400/240",
    link: "/blog/typescript-react",
    author: {
      name: "Connective Official",
      avatar: "https://res.cloudinary.com/djbmyn0fw/image/upload/v1758797741/connective_logo_xuvh06.png"
    },
    date: "Sep 27, 2025"
  },
  {
    title: "🧠 Mastering React Hooks for Beginners.",
    excerpt: "React Hooks were introduced in React 16.8 and completely changed the way developers write React components.",
    image: "https://picsum.photos/id/1016/400/240",
    link: "/blog/designing-component",
    author: {
      name: "Sailash",
      avatar: "https://res.cloudinary.com/djbmyn0fw/image/upload/v1758975326/0f80b7dd-c3f8-4550-a4ef-3e0e59d60c3d_bwspxi.jpg"
    },
    date: "Sep 28, 2025"
  },
  {
    title: "📘 Starting Meaningful Conversations",
    excerpt: "JavaScript is single-threaded, which means it can only run one task at a time. To avoid blocking the main thread, it uses asynchronous programming.",
    image: "https://picsum.photos/id/1018/400/240",
    link: "/blog/deployment",
    author: {
      name: "Geetha",
      avatar: "https://res.cloudinary.com/djbmyn0fw/image/upload/v1758975721/43055cca-14f5-47c8-a494-2e1dd74391d8_pvhhk4.jpg"
    },
    date: "Sep 28, 2025"
  }
];

type PlansItem = {
    name: string,
    price: string,
    subtitle: string,
    features: string[],
    highlight: boolean
}

export const plans: PlansItem[] = [
  {
    name: "Free",
    price: "₹0",
    subtitle: "Best for newcomers",
    features: [
      "Create your profile",
      "Join communities",
      "Post and interact",
      "Access public content"
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹19/yr",
    subtitle: "Popular for regular users",
    features: [
      "Everything in Free",
      "Unlimited groups access",
      "Priority chat support",
      "Early access to new features"
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹49/yr",
    subtitle: "For power users & creators",
    features: [
      "Everything in Pro",
      "AI-powered insights",
      "Custom themes",
      "Verified badge & ranking boost"
    ],
    highlight: false,
  }
];

type FaqsItem = {
    question: string,
    answer: string
}

export const faqs: FaqsItem[] = [
  {
    question: "Is it free?",
    answer: "Yes! Connective offers a free plan with essential features. You can upgrade anytime for more benefits."
  },
  {
    question: "Can I join multiple communities?",
    answer: "Absolutely! You can join as many communities as you like and interact freely within each."
  },
  {
    question: "How is my data used?",
    answer: "Your data is used solely to personalize your experience. We do not share your data with third parties."
  },
  {
    question: "Can I delete my account?",
    answer: "Yes. You can delete your account at any time from your profile settings."
  }
];