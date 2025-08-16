import { useMemo, useState } from "react";

/**
 * Connective — Connections Page
 * Followers / Following model with:
 * - Tabs: Followers | Following | Suggested
 * - Search (name, @username, interests)
 * - Filters: Topic, Online, Location, Mutual-only
 * - Sort: Name, Recently Active, Most Followed, Mutual Count
 * - User Cards: avatar (with fallback), status line, interest chips, badges, online dot, mutuals
 * - Actions: Follow/Unfollow (stateful), Message (drawer), Bookmark
 * - Hover Preview (quick profile)
 * - Empty states
 *
 * No external UI libraries; pure React + Tailwind.
 */

// -------------------- Types --------------------
interface User {
  id: number;
  name: string;
  username: string; // e.g., "@sarah"
  interests: string[];
  profilePic?: string; // optional
  following: boolean; // whether *current user* is following them
  followersCount: number;
  mutualCount: number; // number of mutual connections
  online: boolean;
  location?: string;
  status?: string; // status line e.g., "Reading ..."
  badges?: string[]; // e.g., ["Top AI", "100+ posts"]
  lastActive: string; // ISO date
  suggested?: boolean; // if part of suggestions
}

type TabKey = "followers" | "following" | "suggested";

type SortKey = "name" | "recentlyActive" | "mostFollowed" | "mutualCount";

// -------------------- Mock Data --------------------
const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "John Carter",
    username: "@johnc",
    interests: ["Philosophy", "Psychology"],
    profilePic: "/avatars/john.png",
    following: true,
    followersCount: 1280,
    mutualCount: 3,
    online: true,
    location: "Chennai, IN",
    status: "📚 Reading 'Meditations'",
    badges: ["Top Philosophy", "100+ posts"],
    lastActive: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10m ago
  },
  {
    id: 2,
    name: "Sarah Lee",
    username: "@sarahlee",
    interests: ["AI", "Data Science"],
    profilePic: "/avatars/sarah.png",
    following: false,
    followersCount: 35200,
    mutualCount: 1,
    online: false,
    location: "Bengaluru, IN",
    status: "🤖 Training an LLM toy",
    badges: ["Top AI"],
    lastActive: new Date(Date.now() - 1000 * 60 * 50).toISOString(), // 50m ago
    suggested: true,
  },
  {
    id: 3,
    name: "Amit Kumar",
    username: "@amitk",
    interests: ["History", "Politics"],
    following: true,
    followersCount: 940,
    mutualCount: 0,
    online: true,
    location: "Delhi, IN",
    status: "🧭 Writing on Mauryan Empire",
    lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 4,
    name: "Priya Sharma",
    username: "@priya.design",
    interests: ["Design", "UX"],
    profilePic: "/avatars/priya.png",
    following: false,
    followersCount: 7600,
    mutualCount: 2,
    online: false,
    location: "Pune, IN",
    status: "🎨 Exploring motion UI",
    badges: ["Design Mentor"],
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    suggested: true,
  },
  {
    id: 5,
    name: "Liam Brown",
    username: "@quantliam",
    interests: ["Quantum Computing", "Physics"],
    following: false,
    followersCount: 12000,
    mutualCount: 4,
    online: true,
    status: "⚛️ Posting about QEC",
    badges: ["Top Physics"],
    lastActive: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    suggested: true,
  },
  {
    id: 6,
    name: "Meera N",
    username: "@meeran",
    interests: ["AI", "Education"],
    following: true,
    followersCount: 5400,
    mutualCount: 5,
    online: false,
    location: "Hyderabad, IN",
    status: "✍️ Drafting a post on RAG",
    lastActive: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 7,
    name: "Zed",
    username: "@zed",
    interests: ["Security", "Networks"],
    // no profilePic -> fallback initials
    following: false,
    followersCount: 2200,
    mutualCount: 0,
    online: false,
    location: "Remote",
    status: "🔐 Lab: TLS 1.3",
    lastActive: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), // 1 day
    suggested: true,
  },
];

// Derive followers/following/suggested sets from mock data.
const BASE_FOLLOWERS = MOCK_USERS.filter(() => true); // assume all here follow you
const BASE_FOLLOWING = MOCK_USERS.filter((u) => u.following);
const BASE_SUGGESTED = MOCK_USERS.filter((u) => u.suggested);

// -------------------- Helpers --------------------
const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

const unique = <T,>(arr: T[]) => Array.from(new Set(arr));

// -------------------- Component --------------------
export default function ConnectionsPage() {
  const [tab, setTab] = useState<TabKey>("followers");
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<string>("all");
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [onlyMutual, setOnlyMutual] = useState(false);
  const [location, setLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("recentlyActive");
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [messageUserId, setMessageUserId] = useState<number | null>(null); // drawer
  const [hoverUserId, setHoverUserId] = useState<number | null>(null); // preview

  // Source list per tab
  const sourceList: User[] = useMemo(() => {
    switch (tab) {
      case "followers":
        return BASE_FOLLOWERS;
      case "following":
        return BASE_FOLLOWING;
      case "suggested":
        return BASE_SUGGESTED;
    }
  }, [tab]);

  // Topics & Locations from available users
  const topics = useMemo(
    () => ["all", ...unique(MOCK_USERS.flatMap((u) => u.interests))],
    []
  );
  const locations = useMemo(
    () => ["all", ...unique(MOCK_USERS.map((u) => u.location || "Unknown"))],
    []
  );

  // Filter + Search + Sort
  const filtered = useMemo(() => {
    let list = [...sourceList];

    // Search: name, username, interests
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((u) => {
        const inName = u.name.toLowerCase().includes(q);
        const inUsername = u.username.toLowerCase().includes(q);
        const inInterests = u.interests.some((i) => i.toLowerCase().includes(q));
        return inName || inUsername || inInterests;
      });
    }

    // Topic filter
    if (topic !== "all") {
      list = list.filter((u) => u.interests.includes(topic));
    }

    // Online filter
    if (onlyOnline) {
      list = list.filter((u) => u.online);
    }

    // Mutual-only filter
    if (onlyMutual) {
      list = list.filter((u) => u.mutualCount > 0);
    }

    // Location filter
    if (location !== "all") {
      list = list.filter((u) => (u.location || "Unknown") === location);
    }

    // Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "mostFollowed":
          return b.followersCount - a.followersCount;
        case "mutualCount":
          return b.mutualCount - a.mutualCount;
        case "recentlyActive":
        default:
          return (
            new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
          );
      }
    });

    return list;
  }, [sourceList, search, topic, onlyOnline, onlyMutual, location, sortBy]);

  // Actions
  const toggleFollow = (id: number) => {
    // In real app, call API then refresh. Here we mutate mock arrays for demo.
    const user = MOCK_USERS.find((u) => u.id === id);
    if (user) {
      user.following = !user.following;
    }
  };

  const toggleBookmark = (id: number) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openMessage = (id: number) => setMessageUserId(id);
  const closeMessage = () => setMessageUserId(null);

  // Empty-state helper
  const EmptyState = (
    <div className="text-center py-16 border rounded-2xl">
      <div className="text-5xl mb-2">🔎</div>
      <h3 className="text-lg font-semibold mb-1">No connections match your filters</h3>
      <p className="text-sm text-gray-500">Try clearing search or filters.</p>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Connections</h1>
          <p className="text-gray-500">Discover and manage the minds you connect with.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700">Followers: {BASE_FOLLOWERS.length}</span>
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700">Following: {BASE_FOLLOWING.length}</span>
          <span className="px-3 py-1 text-xs rounded-full bg-amber-50 text-amber-700">Suggested: {BASE_SUGGESTED.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-4 border-b">
        {(['followers', 'following', 'suggested'] as TabKey[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 font-medium -mb-px transition-colors ${
              tab === t
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Controls: Search + Filters + Sort */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        {/* Search */}
        <div className="md:col-span-5 flex items-center border rounded-xl px-3 py-2">
          <span className="mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search name, @username, or interests"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none flex-1"
          />
        </div>

        {/* Topic */}
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="md:col-span-2 border rounded-xl px-3 py-2"
        >
          {topics.map((t) => (
            <option key={t} value={t}>Topic: {t}</option>
          ))}
        </select>

        {/* Location */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="md:col-span-2 border rounded-xl px-3 py-2"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>Location: {loc}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          className="md:col-span-3 border rounded-xl px-3 py-2"
        >
          <option value="recentlyActive">Sort: Recently Active</option>
          <option value="name">Sort: Name (A–Z)</option>
          <option value="mostFollowed">Sort: Most Followed</option>
          <option value="mutualCount">Sort: Mutuals</option>
        </select>
      </div>

      {/* Quick filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setOnlyOnline((v) => !v)}
          className={`px-3 py-1 rounded-full border text-sm ${
            onlyOnline ? 'bg-green-50 border-green-300 text-green-700' : 'hover:bg-gray-50'
          }`}
        >
          🟢 Online only
        </button>
        <button
          onClick={() => setOnlyMutual((v) => !v)}
          className={`px-3 py-1 rounded-full border text-sm ${
            onlyMutual ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'hover:bg-gray-50'
          }`}
        >
          🤝 Mutuals only
        </button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        EmptyState
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              bookmarked={bookmarks.has(u.id)}
              onToggleFollow={() => toggleFollow(u.id)}
              onToggleBookmark={() => toggleBookmark(u.id)}
              onMessage={() => openMessage(u.id)}
              onHover={(val) => setHoverUserId(val ? u.id : null)}
              hovering={hoverUserId === u.id}
            />
          ))}
        </div>
      )}

      {/* Hover Preview */}
      {hoverUserId && (
        <HoverPreview user={MOCK_USERS.find((x) => x.id === hoverUserId)!} />
      )}

      {/* Message Drawer */}
      {messageUserId && (
        <MessageDrawer user={MOCK_USERS.find((x) => x.id === messageUserId)!} onClose={closeMessage} />
      )}
    </div>
  );
}

// -------------------- Subcomponents --------------------
function UserCard({
  user,
  bookmarked,
  onToggleFollow,
  onToggleBookmark,
  onMessage,
  onHover,
  hovering,
}: {
  user: User;
  bookmarked: boolean;
  onToggleFollow: () => void;
  onToggleBookmark: () => void;
  onMessage: () => void;
  onHover: (hovering: boolean) => void;
  hovering: boolean;
}) {
  const { name, username, interests, profilePic, following, online, status, badges, mutualCount, followersCount, suggested } = user;

  return (
    <div
      className="relative border rounded-2xl p-4 shadow-sm hover:shadow-lg transition bg-white"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {profilePic ? (
          <img src={profilePic} alt={name} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
            {name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold truncate">{name}</h3>
            {suggested && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">✨ Suggested</span>
            )}
          </div>
          <div className="text-xs text-gray-500">{username}</div>
          <div className="flex items-center gap-2 text-xs mt-1">
            <span className={`inline-flex items-center gap-1 ${online ? 'text-green-600' : 'text-gray-400'}`}>
              <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-gray-400'}`} />
              {online ? 'Online' : 'Offline'}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">{followersCount.toLocaleString()} followers</span>
          </div>
        </div>
        <button
          onClick={onToggleBookmark}
          className={`ml-auto text-sm px-2 py-1 rounded-md border ${bookmarked ? 'bg-yellow-50 border-yellow-300 text-yellow-700' : 'hover:bg-gray-50'}`}
          title={bookmarked ? 'Saved' : 'Save profile'}
        >
          {bookmarked ? '★ Saved' : '☆ Save'}
        </button>
      </div>

      {/* Interests */}
      <div className="flex flex-wrap gap-2 mb-3">
        {interests.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
            #{tag}
          </span>
        ))}
      </div>

      {/* Status */}
      {status && <p className="text-sm text-gray-700 mb-3 line-clamp-2">{status}</p>}

      {/* Badges & Mutuals */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
        {badges?.map((b) => (
          <span key={b} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{b}</span>
        ))}
        {mutualCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">{mutualCount} mutual</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onToggleFollow}
          className={`px-3 py-1.5 rounded-xl text-white ${following ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {following ? 'Unfollow' : 'Follow'}
        </button>
        <button onClick={onMessage} className="px-3 py-1.5 border rounded-xl hover:bg-gray-50">💬 Message</button>
      </div>

      {/* Simple hover hint */}
      {hovering && (
        <div className="absolute -top-2 -right-2 text-[10px] bg-black text-white px-2 py-0.5 rounded">Preview</div>
      )}
    </div>
  );
}

function HoverPreview({ user }: { user: User }) {
  return (
    <div className="fixed bottom-6 right-6 max-w-xs w-[320px] bg-white border rounded-2xl shadow-2xl p-4 z-40">
      <div className="flex items-center gap-3 mb-2">
        {user.profilePic ? (
          <img src={user.profilePic} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
            {user.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-semibold leading-tight">{user.name}</div>
          <div className="text-xs text-gray-500">{user.username}</div>
        </div>
      </div>
      <div className="text-xs text-gray-600 mb-2">Last active {timeAgo(user.lastActive)}</div>
      <div className="flex flex-wrap gap-1 mb-3">
        {user.interests.map((i) => (
          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">#{i}</span>
        ))}
      </div>
      {user.status && <div className="text-sm">{user.status}</div>}
    </div>
  );
}

function MessageDrawer({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          {user.profilePic ? (
            <img src={user.profilePic} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
              {user.name.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">Chat with {user.name}</div>
            <div className="text-xs text-gray-500 truncate">{user.username} • {user.online ? 'Online' : 'Last active ' + timeAgo(user.lastActive)}</div>
          </div>
          <button onClick={onClose} className="px-2 py-1 border rounded-md hover:bg-gray-50">✕</button>
        </div>

        {/* Messages area (placeholder) */}
        <div className="flex-1 border rounded-xl p-3 overflow-y-auto text-sm text-gray-600">
          <p className="text-gray-400">This is a placeholder chat. Integrate your real-time chat here.</p>
        </div>

        {/* Composer */}
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-xl px-3 py-2"
          />
          <button className="px-3 py-2 rounded-xl bg-blue-600 text-white">Send</button>
        </div>
      </div>
    </div>
  );
}
