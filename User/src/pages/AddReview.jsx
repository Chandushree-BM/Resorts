import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddReview() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    text: "",
    rating: 5,
  });

  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    // load completed bookings for selection
    fetch("http://localhost:5000/api/bookings/user", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(list => {
        const completed = Array.isArray(list) ? list.filter(b => (b.status || "").toLowerCase() === "completed") : [];
        setBookings(completed);
        if (completed.length > 0) setSelectedBookingId(completed[0]._id);
      })
      .catch(() => {});
    // load user profile for avatar preview
    fetch("http://localhost:5000/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(u => setProfile(u))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to add a review ❗");
      return navigate("/signin");
    }

    try {
      // decode token to extract user id if present
      let userId = null;
      try {
        userId = JSON.parse(atob(token.split(".")[1])).id;
      } catch {}

      const booking = bookings.find(b => b._id === selectedBookingId);
      if (!booking) {
        toast.error("You can only review completed bookings. No completed booking selected.");
        return;
      }

      const packageId = booking.packageId?._id || booking.packageId;
      const bookingId = booking._id;

      const payload = {
        packageId,
        bookingId,
        rating: Number(form.rating),
        comment: form.text
      };

      const res = await fetch("http://localhost:5000/api/reviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let message = `Upload failed`;
        try {
          const text = await res.text();
          if (text) message = `${message} (status ${res.status}): ${text}`;
        } catch {}
        throw new Error(message);
      }

      toast.success("Review submitted! It will be visible after admin approval.");
      navigate("/testimonials");

    } catch (error) {
      toast.error(error.message || "Upload failed");
      console.error(error);
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative animate-fadeIn"
      style={{ backgroundImage: `url('/landing/land12.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/50 z-[1]"></div>

      <div className="relative z-20 bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-2xl w-full max-w-lg text-white transition transform hover:scale-[1.01]">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Share Your Experience 🌺
        </h1>

        {/* Profile preview */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={profile?.profilePic || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(profile?.username || 'Guest')}`}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border border-white/40"
          />
          <div className="text-sm">
            <div className="font-medium">{profile?.username || "Guest"}</div>
            <div className="text-white/70">Your profile picture will be shown on your review.</div>
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="@User_Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-teal-300 outline-none"
          />

          <input
            type="text"
            placeholder="Location (City)"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-teal-300 outline-none"
          />

          <textarea
            placeholder="Write your review..."
            required
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="p-3 h-32 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-teal-300 outline-none"
          />

          {/* Select Completed Booking */}
          <select
            value={selectedBookingId}
            onChange={(e) => setSelectedBookingId(e.target.value)}
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-teal-300 outline-none"
          >
            {bookings.length === 0 && <option value="">No completed bookings</option>}
            {bookings.map(b => (
              <option key={b._id} value={b._id}>
                {(b.packageId?.name || "Package")} — {new Date(b.checkOut || b.updatedAt).toLocaleDateString()}
              </option>
            ))}
          </select>

          {/* Star Rating */}
          <div className="flex gap-2 text-2xl justify-center mb-2 rounded-lg bg-white/20 border m-2 p-3">
            Rate Us ~
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setForm({ ...form, rating: star })}
                className={`cursor-pointer transition ${
                  star <= form.rating ? "text-yellow-300" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-teal-300 to-blue-400 text-blue-900 font-semibold py-3 rounded-lg hover:opacity-90 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all"
          >
            Submit Review ✨
          </button>
        </form>
      </div>
    </section>
  );
}
