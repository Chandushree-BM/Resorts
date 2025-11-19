import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Testimonials from "./pages/Testimonials.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile";
import AddReview from "./pages/AddReview.jsx";
import Packages from "./pages/Packages.jsx";
import PackageDetails from "./pages/PackageDetails.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Pay from "./pages/Pay.jsx";
import BookingPage from "./pages/BookingPage.jsx";

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/book/:packageId" element={<BookingForm />} />
        <Route path="/pay/:bookingId" element={<Pay />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

