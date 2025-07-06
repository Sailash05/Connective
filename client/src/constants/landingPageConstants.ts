type StatsDataItem = {
    label: string;
    value: string;
};

export const statsData: StatsDataItem[] = [
    {label: "Posts",value: "1K+"},
    {label: "Users",value: "250k+"},
    {label: "Resource", value: "800+"},
    {label: "Communities",value: "300+"},
    {label: "Groups",value: "250+"},
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