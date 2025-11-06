import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Icons from "react-icons/fa";

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/packages")
      .then((res) => setPackages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pt-28 bg-gray-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-indigo-700 text-center mb-8">
          Resort Packages
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.map((p) => {
            const Icon = Icons[p.icon] || Icons.FaHotel;
            return (
              <article
                key={p._id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Icon />
                      <span className="text-sm font-medium">{p.title}</span>
                    </div>
                    <div className="text-indigo-600 font-bold">₹{p.price}</div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{p.short}</p>
                  <div className="mt-4 flex gap-3">
                    <Link
                      to={`/booking?package=${p._id}`}
                      className="flex-1 text-center py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Book
                    </Link>
                    <Link
                      to={`/packages/${p._id}`}
                      className="py-2 px-3 border rounded-md text-indigo-600"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
