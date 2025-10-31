import CustomCalendar from "../../components/eventPageComponent/CustomCalendar"
import JoinedEvents from "../../components/eventPageComponent/JoinedEvents";

const EventPage = () => {

    const dummyEvents = [
    { id: 1, title: "React Workshop", date: "2025-10-25" },
    { id: 2, title: "Design Meetup", date: "2025-10-25" },
    { id: 3, title: "Hackathon", date: "2025-10-27", joined: true },
  ];

  let events = [
  {
    "_id": "6714f82ef18b28a65c2a3e4b",
    "title": "Design Sync",
    "description": "Weekly design discussion with the UI/UX team.",
    "date": "2025-10-21T00:00:00.000Z",
    "startTime": "10:00 AM",
    "endTime": "11:00 AM",
    "location": "Google Meet",
    "category": "Team Meeting",
    "isPublic": true,
    "createdBy": "670fa8a5e93bcd0021aaf654",
    "participants": [
      "670fa8a5e93bcd0021aaf654",
      "6714f81fe18b28a65c2a3e4a"
    ],
    "maxParticipants": 10,
    "createdAt": "2025-10-19T14:40:46.291Z",
    "updatedAt": "2025-10-19T14:40:46.291Z"
  },
  {
    "_id": "6714f84bf18b28a65c2a3e4c",
    "title": "Frontend Dev Meetup",
    "description": "Connect with other frontend developers to share ideas.",
    "date": "2025-10-23T00:00:00.000Z",
    "startTime": "6:00 PM",
    "endTime": "8:00 PM",
    "location": "Zoom",
    "category": "Networking",
    "isPublic": true,
    "createdBy": "670fa8a5e93bcd0021aaf654",
    "participants": [
      "6714f81fe18b28a65c2a3e4a"
    ],
    "maxParticipants": 50,
    "createdAt": "2025-10-19T15:00:00.000Z",
    "updatedAt": "2025-10-19T15:00:00.000Z"
  }];

    return (
        <div className="md:p-6 p-3">

            {/* Top section */}
            <header className="flex max-sm:flex-col justify-between items-center md:mb-6 mb-3">
                <div className="max-sm:w-full max-sm:px-4">
                    <h1 className="font-bold text-xl md:text-3xl dark:text-white">Events</h1>
                    <p className="max-sm:text-xs text-gray-500 dark:text-gray-200">Discover, join and post events with others.</p>
                </div>
                <div className="h-fit">
                    <button className="bg-blue-600 hover:bg-blue-800 transition-all text-white px-4 py-2 rounded-md">
                        Post Event
                    </button>
                </div>
            </header>

            {/* Filter */}
            <div className="bg-gray-50 shadow-sm rounded-xl p-4 flex flex-wrap gap-3 items-center">
                <input placeholder="Search events, hosts..." className="border rounded-md p-2 w-60" />
                <select className="border rounded-md p-2" >
                    <option value="">All Categories</option>
                    <option>Tech</option>
                    <option>Networking</option>
                    <option>Workshop</option>
                </select>
                <input type="date" className="border rounded-md p-2" />
                <div className="ml-auto flex gap-2">
                    <button className="px-3 py-1 rounded-md bg-gray-200">
                        Reset
                    </button>
                    <button className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-800 transition-all text-white">
                        Apply
                    </button>
                </div>
            </div>

            <div className="mt-2">
                <div className="flex gap-4">
                    <div>
                        <h3 className="text-lg font-bold">Calender</h3>
                        <CustomCalendar events={dummyEvents} onDateClick={(date) => alert(`Clicked on ${date}`)} />
                    </div>
                    <JoinedEvents />
                </div>
            </div>


            <div>
                <h3 className="text-lg font-bold">Explore Events</h3>
                {/* Container */}
                <div className="flex-col gap-2">
<div className="border border-gray-400 rounded-xl p-5 shadow-sm hover:shadow-md transition w-full max-w-2xl mx-auto">
  <div className="flex justify-between items-start">
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Hackathon 2025</h3>
      <p className="text-sm text-gray-500 mt-0.5">Category: <span className="font-medium text-green-600">Technology</span></p>
    </div>
  </div>

  <p className="text-sm text-gray-700 mt-3 line-clamp-2">
    Exciting 24-hour hackathon focusing on AI, teamwork, and creativity.
  </p>
  <p className="text-sm text-gray-700 mt-3 line-clamp-2">
    Created by: Sailash
  </p>

  <div className="mt-5 flex justify-end gap-2">
    <button className="bg-gray-200 hover:bg-gray-300 transition-all px-4 py-2 rounded-lg">View Details</button>
    <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-800 transition-all">
      Join
    </button>
  </div>
</div>


<div className="border border-gray-400 rounded-xl p-5 shadow-sm hover:shadow-md transition w-full max-w-2xl mx-auto">
  <div className="flex justify-between items-start">
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Hackathon 2025</h3>
      <p className="text-sm text-gray-500 mt-0.5">Category: <span className="font-medium text-green-600">Technology</span></p>
    </div>
  </div>

  <p className="text-sm text-gray-700 mt-3 line-clamp-2">
    Exciting 24-hour hackathon focusing on AI, teamwork, and creativity.
  </p>
  <p className="text-sm text-gray-700 mt-3 line-clamp-2">
    Created by: Sailash
  </p>

  <div className="mt-5 flex justify-end gap-2">
    <button className="bg-gray-200 hover:bg-gray-300 transition-all px-4 py-2 rounded-lg">View Details</button>
    <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-800 transition-all">
      Join
    </button>
  </div>
</div>


<div className="border border-gray-400 rounded-xl p-5 shadow-sm hover:shadow-md transition w-full max-w-2xl mx-auto">
  <div className="flex justify-between items-start">
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Hackathon 2025</h3>
      <p className="text-sm text-gray-500 mt-0.5">Category: <span className="font-medium text-green-600">Technology</span></p>
    </div>
  </div>

  <p className="text-sm text-gray-700 mt-3 line-clamp-2">
    Exciting 24-hour hackathon focusing on AI, teamwork, and creativity.
  </p>
  <p className="text-sm text-gray-700 mt-3 line-clamp-2">
    Created by: Sailash
  </p>

  <div className="mt-5 flex justify-end gap-2">
    <button className="bg-gray-200 hover:bg-gray-300 transition-all px-4 py-2 rounded-lg">View Details</button>
    <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-800 transition-all">
      Join
    </button>
  </div>
</div>

                </div>
            </div>

        </div>
    )
}

export default EventPage