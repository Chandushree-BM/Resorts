import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddReview() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    text: "",
    rating: 5,
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to add a review ❗");
      return navigate("/signin");
    }

    const loadingToast = toast.loading("Uploading your review...");

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("location", form.location);
      data.append("text", form.text);
      data.append("rating", form.rating);
      data.append("image", image);

      const res = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.dismiss(loadingToast);
      toast.success("✅ Review Added Successfully!");

      navigate("/testimonials");

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Upload failed ❌");
      console.error(error);
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative animate-fadeIn"
      style={{ backgroundImage: `url('/landing/land12.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/50 "></div>

      <div className="relative z-10 bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-2xl w-full max-w-lg text-white transition transform hover:scale-[1.01]">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Share Your Experience 🌺
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="@User_Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-teal-300 outline-none"
          />

          <input
            type="text"
            placeholder="Location (City)"
            required
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-teal-300 outline-none"
          />

          <textarea
            placeholder="Write your review..."
            required
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="p-3 h-32 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-teal-300 outline-none"
          />

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

          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
            className="p-3 rounded-lg bg-white/20 border border-white/40 cursor-pointer"
          />

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
