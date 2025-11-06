import { Link } from "react-router-dom";
export default function BookingSuccess() {
  return (
    <div className="pt-28 min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl text-center shadow">
        <h1 className="text-3xl font-bold text-indigo-700">Booking Confirmed 🎉</h1>
        <p className="mt-3 text-gray-600">We sent a confirmation to your email/phone. See you soon at EL-MARIO!</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/packages" className="px-4 py-2 bg-indigo-600 text-white rounded">Explore Packages</Link>
          <Link to="/" className="px-4 py-2 border rounded">Back Home</Link>
        </div>
      </div>
    </div>
  );
}
