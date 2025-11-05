import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Testimonials from "./pages/Testimonials.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact.jsx";
import Packages from "./pages/Packages";
import BookingPage from "./pages/BookingPage.jsx";
import PackageDetails from "./pages/Packagedetails.jsx";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
<Route path="/booking" element={<BookingPage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} /> 

      </Routes>
    </Router>
  );
}