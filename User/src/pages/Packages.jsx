import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaMapMarkerAlt, FaRupeeSign, FaCalendarCheck } from "react-icons/fa";
import axios from "axios";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 25000,
    availability: "all"
  });

  const [showFilters, setShowFilters] = useState(false);

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages");
        setPackages(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Get unique locations
  const locations = [...new Set(packages.map(pkg => pkg.location))];

  // Filter packages
  const filteredPackages = packages.filter(pkg => {
    const matchesLocation = !filters.location || pkg.location === filters.location;
    const matchesPrice = pkg.price >= filters.minPrice && pkg.price <= filters.maxPrice;
    const matchesAvailability = filters.availability === "all" || 
      (filters.availability === "available" && pkg.available) ||
      (filters.availability === "unavailable" && !pkg.available);
    
    return matchesLocation && matchesPrice && matchesAvailability;
  });

  const getOfferInfo = (pkg) => {
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

  const resetFilters = () => {
    setFilters({
      location: "",
      minPrice: 0,
      maxPrice: 25000,
      availability: "all"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Resort Packages</h1>
          <p className="text-xl text-blue-100">Find your perfect escape</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : (
          <>
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaFilter className="text-indigo-600" />
              Filters
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>

          <div className={`grid md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            
            {/* Location Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaMapMarkerAlt className="text-indigo-500" />
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
              >
                <option value="">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaRupeeSign className="text-green-500" />
                Min Price
              </label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                placeholder="Min"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaRupeeSign className="text-green-500" />
                Max Price
              </label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) || 25000 })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                placeholder="Max"
              />
            </div>

            {/* Availability Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaCalendarCheck className="text-blue-500" />
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
              >
                <option value="all">All Packages</option>
                <option value="available">Available Only</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Reset Filters
            </button>
            <p className="text-gray-600 self-center">
              Showing {filteredPackages.length} of {packages.length} packages
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map(pkg => {
            const offer = getOfferInfo(pkg);
            const cardImg = pkg.image || ((pkg.images && pkg.images.length > 0) ? pkg.images[0] : pkg.img);
            return (
            <div key={pkg._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              
              {/* Image */}
              <div className="relative h-56">
                {cardImg ? (
                  <img
                    src={cardImg}
                    alt={pkg.name}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholder.jpg"; }}
                    className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500" />
                )}
                <div className="absolute top-4 right-4">
                  {pkg.available ? (
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Sold Out
                    </span>
                  )}
                </div>
                {offer.active && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      -{offer.discount}% off
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <h3 className="text-white text-2xl font-bold text-center px-4">{pkg.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-500 italic text-sm mb-3">{pkg.tagline}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-indigo-500" />
                    <span>{pkg.location}</span>
                  </div>
                  <span className="text-sm text-gray-500">{pkg.duration}</span>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                {/* Highlights */}
                <div className="mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Highlights:</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    {offer.active ? (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-gray-400 line-through text-lg">₹{pkg.price.toLocaleString()}</span>
                          <span className="text-3xl font-bold text-indigo-600">₹{offer.discountedPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500">per night • ends {offer.endDate.toLocaleDateString()}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-3xl font-bold text-indigo-600">₹{pkg.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">per night</p>
                      </div>
                    )}
                  </div>
                  <Link
                    to={`/packages/${pkg._id}`}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );})}
        </div>

        {/* No Results */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-4">No packages found matching your filters</p>
            <button
              onClick={resetFilters}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block bg-gray-200 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-300 transition"
          >
            ← Back to Home
          </Link>
        </div>
        </>
        )}
      </div>
    </div>
  );
}