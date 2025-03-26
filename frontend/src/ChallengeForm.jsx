import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ChallengeForm() {
  const [opponentId, setOpponentId] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("http://localhost:5001/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sender_id: user.id,
          receiver_id: opponentId,
          match_date: date,
          location,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setOpponentId("");
        setDate("");
        setLocation("");
      } else {
        setError(data.error || "Failed to send challenge.");
      }
    } catch (err) {
      setError("❌ Network error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="border p-4 rounded shadow bg-white dark:bg-gray-800 mt-4"
    >
      <h2 className="text-xl font-semibold mb-2">🎯 Issue a Challenge</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Opponent</label>
          <select
            value={opponentId}
            onChange={(e) => setOpponentId(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            required
          >
            <option value="">Select an opponent</option>
            {/* Ideally populate this from state */}
            {user && user.id && (
              <option value="2">Opponent #2</option> // Replace with real list
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Send Challenge
        </button>

        {success && <p className="text-green-600">✅ Challenge sent!</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </motion.div>
  );
}

