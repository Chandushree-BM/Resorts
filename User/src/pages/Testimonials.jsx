import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.log(err));
  }, []);

  // ✅ Logged-in user ID
  const token = localStorage.getItem("token");
  let loggedInUserId = null;
  if (token) {
    loggedInUserId = JSON.parse(atob(token.split(".")[1])).id;
  }

  // ✅ Delete Review
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/reviews/${id}`, {
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
    const res = await fetch(`http://localhost:5000/reviews/${editingReview._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        text: editText,
        rating: editRating,
        name: editingReview.name,
        location: editingReview.location,
      })
    });

    const updated = await res.json();
    setTestimonials(testimonials.map(r => (r._id === updated._id ? updated : r)));
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

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white/10 hover:bg-white/20 transition-all p-6 rounded-2xl backdrop-blur-md shadow-lg border border-white/10 text-left"
              >
                {/* Profile */}
                <div className="flex items-center mb-4">
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
                <div className="flex items-center mb-3">
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
