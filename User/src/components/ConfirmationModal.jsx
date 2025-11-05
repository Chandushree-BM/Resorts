export default function ConfirmationModal({ pkg, checkIn, checkOut, guests, total, onClose, onConfirm, loading, name, phone }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold">Confirm Booking</h3>
        <p className="text-sm text-gray-600 mt-2">Please review your details</p>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between"><span className="text-sm text-gray-700">Package</span><strong>{pkg?.title || "Selected Package"}</strong></div>
          <div className="flex justify-between"><span className="text-sm text-gray-700">Dates</span><strong>{checkIn} → {checkOut}</strong></div>
          <div className="flex justify-between"><span className="text-sm text-gray-700">Guests</span><strong>{guests}</strong></div>
          <div className="flex justify-between"><span className="text-sm text-gray-700">Name</span><strong>{name}</strong></div>
          <div className="flex justify-between"><span className="text-sm text-gray-700">Phone</span><strong>{phone}</strong></div>
          <div className="flex justify-between"><span className="text-sm text-gray-700">Total</span><strong>₹{total}</strong></div>
        </div>

        <div className="mt-5 flex gap-3">
          <button onClick={onConfirm} disabled={loading} className="flex-1 bg-indigo-600 text-white py-2 rounded">{loading ? "Booking..." : "Confirm & Pay"}</button>
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}
