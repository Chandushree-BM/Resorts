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

  const Icon = Icons[pkg.icon] || Icons.FaHotel;

  return (
    <div className="pt-28 max-w-3xl mx-auto px-4">
      <img src={pkg.img} alt={pkg.title} className="w-full h-72 object-cover rounded-lg shadow" />

      <h2 className="text-3xl font-bold mt-4 text-indigo-700 flex gap-2 items-center">
        <Icon /> {pkg.title}
      </h2>

      <p className="text-gray-600 mt-3">{pkg.short}</p>

      <div className="mt-4 flex justify-between">
        <span className="text-indigo-600 font-bold text-2xl">₹{pkg.price}</span>
        <Link to={`/booking?package=${pkg._id}`}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Book Now
        </Link>
      </div>
    </div>
  );
}
