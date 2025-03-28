import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Lazy-loaded routes
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
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/players" element={<PlayersList />} />
          <Route path="/players/:id" element={<PlayerProfile />} />
          <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => {
  useEffect(() => {
    toast.success(`🎉 TennisConnect v${__APP_VERSION__} loaded`, { autoClose: 3000 });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <Suspense fallback={<div className="p-8">Loading...</div>}>
          <AnimatedRoutes />
        </Suspense>
        <ToastContainer />
        <footer className="text-center text-xs text-gray-400 mt-8 mb-4">
          v{__APP_VERSION__}
        </footer>
      </div>
    </Router>
  );
};

export default App;

