import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AvatarHoverCard({ player, size = 32 }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  if (!player) return null;

  const initials = `${player.first_name?.[0] ?? "?"}${player.last_name?.[0] ?? ""}`;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {player.profile_picture ? (
        <img
          src={player.profile_picture}
          alt="avatar"
          loading="lazy"
          onError={(e) => (e.target.src = "/default-avatar.png")}
          className="rounded-full object-cover border"
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="bg-blue-500 text-white rounded-full flex items-center justify-center font-bold border"
          style={{ width: size, height: size, fontSize: size * 0.4 }}
        >
          {initials}
        </div>
      )}

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute top-full mt-1 left-1/2 -translate-x-1/2 z-50 p-2 bg-white border rounded shadow text-xs w-48"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-semibold">{player.first_name} {player.last_name}</div>
            <div>🎾 Skill: {player.skill_level ?? "N/A"}</div>
            <div>📍 {player.city ?? "Unknown"}</div>
            <button
              onClick={() => navigate(`/players/${player.id}`)}
              className="text-blue-500 underline text-xs mt-1"
            >
              View Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

