import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-3">
          ✅ Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-5">
          Your dreamy stay is locked in. Pack your bags 🧳✨
        </p>

        <Link
          to="/packages"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Explore More Packages
        </Link>
      </div>
    </div>
  );
}
