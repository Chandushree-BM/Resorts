import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaRupeeSign, FaClock, FaCheckCircle, FaTimesCircle, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

export default function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setPkg(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package:", error);
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  useEffect(() => {
    if (pkg) {
      const imgs = (pkg.images && pkg.images.length > 0) ? pkg.images : (pkg.img ? [pkg.img] : []);
      setSelectedImage(imgs[0] || null);
    }
  }, [pkg]);

  const getOfferInfo = (pkg) => {
    if (!pkg) return { active: false };
    const discount = pkg?.offer?.discountPercent ?? pkg?.offerPercent;
    const start = pkg?.offer?.startDate ?? pkg?.offerStart;
    const end = pkg?.offer?.endDate ?? pkg?.offerEnd;
    if (!discount || !end) return { active: false };
    const now = new Date();
    const startDate = start ? new Date(start) : new Date(0);
    const endDate = new Date(end);
    const active = now >= startDate && now <= endDate;
    if (!active) return { active: false };
    const discountedPrice = Math.max(0, Math.round(pkg.price - (pkg.price * discount) / 100));
    return { active: true, discount, discountedPrice, endDate };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Package Not Found</h2>
          <Link to="/packages" className="text-indigo-600 hover:underline">
            ← Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  const toggleAddOn = (addOn) => {
    if (selectedAddOns.includes(addOn.name)) {
      setSelectedAddOns(selectedAddOns.filter(a => a !== addOn.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn.name]);
    }
  };

  const offer = getOfferInfo(pkg);
  const basePrice = offer.active ? offer.discountedPrice : pkg.price;
  const totalPrice = basePrice + pkg.addOns
    .filter(addon => selectedAddOns.includes(addon.name))
    .reduce((sum, addon) => sum + addon.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <div className="mb-4">
            {pkg.available ? (
              <span className="bg-green-500 px-6 py-2 rounded-full text-sm font-semibold">
                ✓ Available Now
              </span>
            ) : (
              <span className="bg-red-500 px-6 py-2 rounded-full text-sm font-semibold">
                Currently Unavailable
              </span>
            )}
          </div>
          {offer.active && (
            <div className="absolute top-6 right-6">
              <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                -{offer.discount}% off until {offer.endDate.toLocaleDateString()}
              </span>
            </div>
          )}
          <h1 className="text-5xl font-bold mb-3 text-center">{pkg.name}</h1>
          <p className="text-2xl italic text-blue-100">{pkg.tagline}</p>
          <div className="flex gap-6 mt-6 text-lg">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt /> {pkg.location}
            </span>
            <span className="flex items-center gap-2">
              <FaClock /> {pkg.duration}
            </span>
            {offer.active ? (
              <span className="flex items-center gap-2">
                <FaRupeeSign />
                <span className="text-blue-200 line-through">{pkg.price.toLocaleString()}</span>
                <span className="font-bold">{offer.discountedPrice.toLocaleString()}</span> / night
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FaRupeeSign /> {pkg.price.toLocaleString()} / night
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Image Gallery */}
        {(pkg.images?.length > 0 || pkg.img) && (
          <div className="bg-white rounded-2xl shadow-xl p-4 mb-8">
            <div className="w-full h-96 rounded-xl overflow-hidden bg-gray-100">
              {selectedImage && (
                <img src={selectedImage} alt={pkg.name} className="w-full h-full object-cover" />
              )}
            </div>
            {pkg.images?.length > 1 && (
              <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-3">
                {pkg.images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(src)}
                    className={`h-20 rounded-lg overflow-hidden border-2 ${selectedImage === src ? 'border-indigo-600' : 'border-transparent'}`}
                    aria-label={`Select image ${idx + 1}`}
                  >
                    <img src={src} alt={`${pkg.name} ${idx + 1}`} loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Description */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About This Package</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{pkg.description}</p>
          <div className="mt-4 inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full">
            <strong>Perfect for:</strong> {pkg.target}
          </div>
        </div>

        {/* Itinerary */}
        {pkg.itinerary && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaCalendarAlt className="text-indigo-600" />
              Day-wise Itinerary
            </h2>
            <div className="space-y-6">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="border-l-4 border-indigo-500 pl-6">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-2">
                    Day {day.day}: {day.title}
                  </h3>
                  <ul className="space-y-2">
                    {day.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* Highlights */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Package Highlights</h3>
            <ul className="space-y-3">
              {pkg.highlights.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Inclusions */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h3>
            <ul className="space-y-3">
              {pkg.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-indigo-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600">
                <strong>Meal Plan:</strong> {pkg.mealPlan}
              </p>
            </div>
          </div>

          {/* Exclusions */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Not Included</h3>
            <ul className="space-y-3">
              {pkg.exclusions.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <FaTimesCircle className="text-red-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking Policies</h3>
            <ul className="space-y-3">
              {pkg.policies.map((policy, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span>{policy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Add-ons */}
        {pkg.addOns && pkg.addOns.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Optional Add-ons</h3>
            <div className="space-y-4">
              {pkg.addOns.map((addon, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition ${
                    selectedAddOns.includes(addon.name)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => toggleAddOn(addon)}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addon.name)}
                      onChange={() => {}}
                      className="w-5 h-5 text-indigo-600 rounded"
                    />
                    <span className="font-semibold text-gray-800">{addon.name}</span>
                  </div>
                  <span className="text-indigo-600 font-bold">+ ₹{addon.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">Ready to Book?</h3>
              <p className="text-blue-100">Total Price: ₹{totalPrice.toLocaleString()}</p>
              {selectedAddOns.length > 0 && (
                <p className="text-sm text-blue-200 mt-1">
                  (Including {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''})
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <Link
                to="/packages"
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                ← All Packages
              </Link>
              {pkg.available ? (
                <Link 
                  to={`/book/${pkg._id}`}
                  className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-300 transition shadow-lg">
                  Book Now
                </Link>
              ) : (
                <button
                  disabled
                  className="px-8 py-4 bg-gray-400 text-gray-700 rounded-xl font-semibold cursor-not-allowed"
                >
                  Currently Unavailable
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
