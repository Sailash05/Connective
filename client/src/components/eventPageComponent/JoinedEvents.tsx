
const JoinedEvents = () => {

    return (
        <div className="flex-grow">
            <header className="flex justify-between px-10 mb-2">
                <h3 className="text-lg font-bold">Next Event</h3>
                <button className="text-blue-500 font-extrabold">View All </button>
            </header>



            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition w-full max-w-md mx-auto">
  {/* Header */}
  <div className="flex justify-between items-start">
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Hackathon 2025</h3>
      <p className="text-sm text-gray-500 mt-0.5">Category: <span className="font-medium text-blue-600">Technology</span></p>
    </div>
    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
      Offline
    </span>
  </div>

  {/* Description */}
  <p className="text-sm text-gray-700 mt-3 line-clamp-2">
    Join us for an exciting 24-hour hackathon focused on AI and innovation. 
    Collaborate with like-minded developers and showcase your creativity.
  </p>

  {/* Info */}
  <div className="mt-4 space-y-1 text-sm text-gray-600">
    <div className="flex items-center gap-2">
      <span>📅</span> <span>Oct 27, 2025</span>
    </div>
    <div className="flex items-center gap-2">
      <span>⏰</span> <span>9:00 AM – 6:00 PM</span>
    </div>
    <div className="flex items-center gap-2">
      <span>📍</span> <span>Tech Park Auditorium</span>
    </div>
  </div>

  {/* Organizers */}
  <div className="mt-4 text-sm text-gray-600">
    <p>
      <span className="font-medium text-gray-800">Created by:</span> Rahul Mehta
    </p>
    <p>
      <span className="font-medium text-gray-800">Organized by:</span> CodeVerse Pvt. Ltd.
    </p>
  </div>

  {/* Participants */}
  <div className="mt-4 flex justify-between items-center text-sm">
    <div className="text-gray-600">
      Participants: <span className="font-semibold text-gray-800">45</span> / <span className="text-gray-500">100</span>
    </div>
    <div className="flex gap-1">
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
    </div>
  </div>

  {/* Action Button */}
  <div className="mt-5 flex justify-end">
    <button className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
      Join Event
    </button>
  </div>
</div>





        </div>
    )
}

export default JoinedEvents;