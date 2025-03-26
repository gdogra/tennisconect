import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastProvider } from "./ToastContext";
import { AnimatePresence, motion } from "framer-motion";
import InstallPrompt from "./components/InstallPrompt";
import "./App.css";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./LandingPage"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Dashboard = lazy(() => import("./Dashboard"));
const PlayersList = lazy(() => import("./components/PlayersList"));
const PlayerProfile = lazy(() => import("./components/PlayerProfile"));

const AnimatedRoutes = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <LandingPage />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Register />
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard />
              </motion.div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/players"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PlayersList />
            </motion.div>
          }
        />
        <Route
          path="/players/:id"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PlayerProfile />
            </motion.div>
          }
        />
        <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Navbar />
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <AnimatedRoutes />
          </Suspense>
          <InstallPrompt />
        </div>
      </ToastProvider>
    </Router>
  );
};

export default App;

