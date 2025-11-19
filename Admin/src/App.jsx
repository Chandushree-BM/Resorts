import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Packages from "./pages/Packages";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import Payments from "./pages/Payments";
import Offers from "./pages/Offers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopBar from "./components/TopBar";
import Messages from "./pages/Messages";

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  const hideTopBar = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!hideTopBar && <TopBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/users" element={<Users />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </>
  );
}
