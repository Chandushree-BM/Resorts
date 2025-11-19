import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const loadAllApproved = async () => {
      try {
        // get all packages
        const pkRes = await fetch("http://localhost:5000/api/packages");
        const pkgs = await pkRes.json();
        if (!Array.isArray(pkgs)) return setTestimonials([]);

        // fetch approved reviews for each package
        const arrays = await Promise.all(
          pkgs.map(async (p) => {
            try {
              const r = await fetch(`http://localhost:5000/api/reviews/package/${p._id}`);
              const data = await r.json();
              const list = Array.isArray(data.reviews) ? data.reviews : [];
              // map to UI-friendly structure
              return list.map((rev) => ({
                _id: rev._id,
                name: rev.userId?.username || "Guest",
                location: p.location || p.name || "",
                image: rev.userId?.profilePic || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(rev.userId?.username || 'Guest')}`,
                rating: rev.rating,
                text: rev.comment,
                userId: String(rev.userId?._id || rev.userId || ""),
              }));
            } catch {
              return [];
            }
          })
        );

        const flat = arrays.flat().sort((a, b) => (a._id > b._id ? -1 : 1));
        setTestimonials(flat);
      } catch (e) {
        console.log(e);
        setTestimonials([]);
      }
    };
    loadAllApproved();
  }, []);

  // ✅ Logged-in user ID
  const token = localStorage.getItem("token");
  let loggedInUserId = null;
  if (token) {
    loggedInUserId = JSON.parse(atob(token.split(".")[1])).id;
  }

  // ✅ Delete Review
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setTestimonials(testimonials.filter((r) => r._id !== id));
  };

  // ✅ Edit State
  const [editingReview, setEditingReview] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  // ✅ Open Edit Modal
  const handleEdit = (review) => {
    setEditingReview(review);
    setEditText(review.text);
    setEditRating(review.rating);
  };

  // ✅ Save Changes
  const handleSave = async () => {
    const res = await fetch(`http://localhost:5000/api/reviews/${editingReview._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        comment: editText,
        rating: Number(editRating)
      })
    });

    const updated = await res.json();
    setTestimonials(testimonials.map(r => (r._id === updated.review?._id || updated._id ? (r._id === (updated.review?._id || updated._id) ? {
      ...r,
      text: updated.review?.comment || updated.comment || editText,
      rating: updated.review?.rating || updated.rating || editRating
    } : r) : r)));
    setEditingReview(null);
  };

  return (
    <>
      <section className="relative min-h-screen bg-[url('/landing/land.jpeg')] bg-cover bg-center text-white py-16 px-6">
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading mb-12">
            Guest Reviews 🌴
          </h1>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white/10 hover:bg-white/20 transition-all p-7 rounded-2xl backdrop-blur-md shadow-lg border border-white/10 text-left space-y-5"
              >
                {/* Profile */}
                <div className="flex items-center mb-5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-white mr-3 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-blue-300">{t.name}</h4>
                    <p className="text-sm text-slate-200">{t.location}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(Number(t.rating))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>

                {/* Text */}
                <p className="italic text-slate-100">{t.text}</p>

                {/* ✅ Show Edit/Delete ONLY if user owns it */}
                {String(t.userId) === loggedInUserId && (
  <div className="flex justify-between mt-4 text-sm">
    <button onClick={() => handleEdit(t)} className="text-blue-300 hover:text-blue-400 underline">
      Edit
    </button>
    <button onClick={() => handleDelete(t._id)} className="text-red-300 hover:text-red-400 underline">
      Delete
    </button>
  </div>
)}

              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center mt-16">
          <Link
            to="/"
            className="inline-block bg-white text-blue-800 hover:bg-blue-100 px-8 py-3 rounded-full font-medium transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* ✅ Edit Modal */}
        {editingReview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]">
            <div className="bg-white text-gray-800 p-6 rounded-2xl w-96 shadow-xl animate-fadeIn">

              <h2 className="text-xl font-semibold mb-3">Edit Review ✏️</h2>

              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full border rounded p-2 mb-4"
              />

              <label className="block font-medium mb-1">Rating ⭐</label>
              <input
                type="number"
                min="1"
                max="5"
                value={editRating}
                onChange={(e) => setEditRating(e.target.value)}
                className="w-full border rounded p-2 mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save ✅
                </button>
              </div>
            </div>
          </div>
        )}

      </section>
    </>
  );
}
