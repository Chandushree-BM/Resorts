import React, { useState } from "react";
import axios from "axios";

export default function BookingModal({ pkg, onClose }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const nights = (() => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.floor(diff));
  })();
  const total = (pkg.pricePerNight || 6999) * Math.max(1, nights);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return alert("Select dates");
    if (new Date(checkOut) <= new Date(checkIn)) return alert("Check-out must be after check-in");

    setLoading(true);

    try {
      // Optional: availability check
      // const avail = await axios.get(`/api/packages/${pkg.id}/availability?from=${checkIn}&to=${checkOut}`);
      // if (!avail.data.available) return alert("Not available for these dates");

      const payload = {
        packageId: pkg.id,
        checkIn,
        checkOut,
        guests,
        customerName: name,
        phone,
        total
      };

      // call backend booking API (implement in Phase 2)
      await axios.post("http://localhost:5000/api/bookings", payload);

      alert("Booking confirmed! We sent a confirmation.");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-5 shadow-lg">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Reserve: {pkg.title}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <form onSubmit={handleBook} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              Check-in
              <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-1 w-full border rounded px-2 py-2" />
            </label>
            <label className="text-sm">
              Check-out
              <input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 w-full border rounded px-2 py-2" />
            </label>
          </div>

          <div className="flex gap-3">
            <label className="flex-1 text-sm">
              Guests
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="mt-1 w-full border rounded px-2 py-2">
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} guest{n>1?'s':''}</option>)}
              </select>
            </label>
            <label className="flex-1 text-sm">
              Phone
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full border rounded px-2 py-2" placeholder="eg. +91 98..." />
            </label>
          </div>

          <label className="text-sm block">
            Your name
            <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border rounded px-2 py-2" />
          </label>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Nights: <strong>{nights || 1}</strong></div>
            <div className="text-lg font-semibold">Total: ₹{total}</div>
          </div>

          <div className="flex gap-3 mt-2">
            <button type="submit" disabled={loading} className="flex-1 bg-amber-400 text-slate-900 py-2 rounded font-semibold">
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
