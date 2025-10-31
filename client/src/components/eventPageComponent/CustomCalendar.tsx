import { useState, useMemo } from "react";

export interface CalendarEvent {
  id: number | string;
  title: string;
  date: string; // YYYY-MM-DD
  joined?: boolean;
}

interface CustomCalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: string) => void;
}

export default function CustomCalendar({
  events = [],
  onDateClick,
}: CustomCalendarProps) {
  const today = new Date();

  // Year range
  const startYear = 2024;
  const endYear = 2028;

  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(
    today.getFullYear() < startYear ? startYear : today.getFullYear() > endYear ? endYear : today.getFullYear()
  );

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const eventsByDate = useMemo<Record<string, CalendarEvent[]>>(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((ev) => {
      const k = ev.date;
      if (!map[k]) map[k] = [];
      map[k].push(ev);
    });
    return map;
  }, [events]);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const prevMonth = () => {
    if (currentYear === startYear && currentMonth === 0) return; // stop at start
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentYear === endYear && currentMonth === 11) return; // stop at end
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (d: number | null) => {
    if (!d) return;
    const iso = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    onDateClick?.(iso);
  };

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className={`px-2 py-1 rounded-md ${currentYear === startYear && currentMonth === 0 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"}`}
          disabled={currentYear === startYear && currentMonth === 0}
        >
          ←
        </button>

        {/* Month & Year Dropdowns */}
        <div className="flex items-center gap-2">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(Number(e.target.value))}
            className="border px-2 py-1 rounded-md"
          >
            {monthNames.map((name, index) => (
              <option key={index} value={index}>{name}</option>
            ))}
          </select>

          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className="border px-2 py-1 rounded-md"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button
          onClick={nextMonth}
          className={`px-2 py-1 rounded-md ${currentYear === endYear && currentMonth === 11 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"}`}
          disabled={currentYear === endYear && currentMonth === 11}
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-600 font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2 text-center">
  {days.map((d, i) => {
    const iso = d
      ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
      : null;

    // Get events for the day
    const dayEvents = iso ? eventsByDate[iso] || [] : [];
    const hasEvents = dayEvents.length > 0;

    // Check if user joined any event on this day
    const userJoined = dayEvents.some((ev) => (ev as any).joined); // cast to 'any' if joined not typed yet

    const isToday =
      d &&
      d === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    return (
      <div
        key={i}
        onClick={() => handleDayClick(d)}
        className={`cursor-pointer p-2 rounded-md border text-sm transition 
          ${!d ? "invisible" : ""}
          ${isToday ? "bg-blue-100 border-blue-400" : "border-gray-200"}
          ${userJoined ? "bg-green-100 border-green-400" : ""}
          hover:bg-blue-50
        `}
      >
        <div>{d}</div>

        {/* Show number of events */}
        {hasEvents && (
          <div className="mt-1 text-xs">
            {/* <span className="w-2 h-2 bg-blue-500 rounded-full"></span> */}
            <span>{dayEvents.length} Events</span>
          </div>
        )}
      </div>
    );
  })}
</div>

    </div>
  );
}
