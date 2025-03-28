import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MatchModal({ match, onClose, onMatchUpdated, token }) {
  const [score, setScore] = useState(match.score || "");
  const [newDate, setNewDate] = useState(match.match_date?.slice(0, 10));
  const [location, setLocation] = useState(match.location || "");

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5001/calendar/matches/${match.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score, date: newDate, location }),
      });

      if (res.ok) {
        onMatchUpdated();
        onClose();
      } else {
        alert("Failed to update match.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-6 rounded shadow-lg w-[350px]"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-bold mb-4">Edit Match vs. {match.opponent}</h2>

          <label className="block mb-2 text-sm">Score</label>
          <input
            type="text"
            className="border w-full mb-3 px-2 py-1"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <label className="block mb-2 text-sm">Date</label>
          <input
            type="date"
            className="border w-full mb-3 px-2 py-1"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />

          <label className="block mb-2 text-sm">Location</label>
          <input
            type="text"
            className="border w-full mb-4 px-2 py-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="text-gray-500">Cancel</button>
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-3 py-1 rounded">
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

