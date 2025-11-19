import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import * as Icons from "react-icons/fa";

export default function PackageView() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/packages/${id}`)
      .then(res => setPkg(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!pkg) return <p className="pt-32 text-center">Loading...</p>;

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

  const offer = getOfferInfo(pkg);

  const Icon = Icons[pkg.icon] || Icons.FaHotel;

  return (
    <div className="pt-28 max-w-3xl mx-auto px-4">
      <img src={pkg.img} alt={pkg.title} className="w-full h-72 object-cover rounded-lg shadow" />

      <h2 className="text-3xl font-bold mt-4 text-indigo-700 flex gap-2 items-center">
        <Icon /> {pkg.title}
      </h2>

      <p className="text-gray-600 mt-3">{pkg.short}</p>

      <div className="mt-4 flex justify-between">
        {offer.active ? (
          <span className="text-indigo-600 font-bold text-2xl flex items-baseline gap-2">
            <span className="text-gray-400 line-through text-lg">₹{pkg.price.toLocaleString()}</span>
            <span>₹{offer.discountedPrice.toLocaleString()}</span>
          </span>
        ) : (
          <span className="text-indigo-600 font-bold text-2xl">₹{pkg.price.toLocaleString()}</span>
        )}
        <Link to={`/booking?package=${pkg._id}`}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Book Now
        </Link>
      </div>
    </div>
  );
}
