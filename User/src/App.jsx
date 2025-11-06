import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Testimonials from "./pages/Testimonials.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact.jsx";
<<<<<<< HEAD
import AddReview from "./pages/AddReview.jsx";
=======

>>>>>>> 1748df4a116702741114635adf2b7809a24931ac
export default function App() {
  return (
    <>
    <Toaster position="top-center" />
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
<<<<<<< HEAD
        <Route path="/add-review" element={<AddReview />} />
=======
<Route path="/booking" element={<BookingPage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} /> 

>>>>>>> 1748df4a116702741114635adf2b7809a24931ac
      </Routes>
    </Router></>
  );
}