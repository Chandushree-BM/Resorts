import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const selectedPackage = searchParams.get("packageId"); // dynamic package ID
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    package: selectedPackage || "",
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/packages");
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.log("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      toast.success("Booking Successful 🥳");
      console.log(data);
    } catch (error) {
      console.log("Booking failed:", error);
      toast.error("Booking Failed 😭 Try Again!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Book Your Trip ✈️</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Packages Dropdown */}
        <select
          name="package"
          value={formData.package}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="" disabled>
            Select Package
          </option>
          {packages.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} (₹{p.price})
            </option>
          ))}
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
