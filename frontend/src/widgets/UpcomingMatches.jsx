import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5001/dashboard/upcoming-matches/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setMatches(data);
        } else {
          setError(data.error || "Failed to fetch upcoming matches");
        }
      } catch (err) {
        setError("❌ Network error while fetching upcoming matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const matchesOnSelectedDate = matches.filter((match) => {
    const matchDate = new Date(match.date).toDateString();
    return matchDate === selectedDate.toDateString();
  });

  return (
    <div className="border p-4 rounded shadow bg-white dark:bg-gray-800">
      <h2
        className="text-xl font-semibold cursor-pointer flex justify-between items-center"
        onClick={() => setCollapsed(!collapsed)}
      >
        📅 Upcoming Matches{" "}
        <span>{collapsed ? "+" : "−"}</span>
      </h2>

      {!collapsed && (
        <div className="mt-4">
          {loading && <p className="text-gray-500">Loading upcoming matches...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="mb-4 mx-auto"
              />
              <h3 className="text-lg font-medium text-center">
                Matches on {selectedDate.toDateString()}
              </h3>
              {matchesOnSelectedDate.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {matchesOnSelectedDate.map((match) => (
                    <li
                      key={match.id}
                      className="bg-blue-100 dark:bg-blue-900 p-2 rounded"
                    >
                      vs {match.opponent} at {match.location} ({match.city})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No matches on this day.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

