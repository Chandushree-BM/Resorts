import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      name: "@aarav_meera",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
      text: "Our anniversary trip was magical! The staff were kind, the food divine, and the ocean view unforgettable.",
      rating: 5,
    },
    {
      name: "@nikhil_family",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
      text: "Perfect family resort! Kids loved the pool, and we loved the spa. Every moment felt peaceful and luxurious.",
      rating: 4,
    },
    {
      name: "@riya_travels",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&q=80",
      text: "As a solo traveler, I felt safe, welcome, and pampered. A place I’d return to again and again.",
      rating: 5,
    },
    {
      name: "@anika_weds",
      location: "Pune",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&q=80",
      text: "We hosted our wedding here—it was a dream come true! Elegant décor and breathtaking sunset views.",
      rating: 5,
    },
    {
      name: "@rohan_business",
      location: "Hyderabad",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100&q=80",
      text: "Visited for a business retreat. Great conference facilities, food, and ambience. Truly refreshing!",
      rating: 4,
    },
  ];

  return (
    <>
      {/* Background Section */}
      <section className="relative min-h-screen bg-[url('/landing/land.jpeg')] bg-cover bg-center text-white py-16 px-6">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading mb-12">
            Guest Reviews 🌴
          </h1>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white/10 hover:bg-white/20 transition-all p-6 rounded-2xl backdrop-blur-md shadow-lg border border-white/10 text-left"
              >
                {/* Profile Info */}
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

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>

                {/* Text */}
                <p className="italic text-slate-100">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Back to Home Button (inside background but above overlay) */}
        <div className="relative z-10 text-center mt-16">
          <Link
            to="/"
            className="inline-block bg-white text-blue-800 hover:bg-blue-100 px-8 py-3 rounded-full font-medium transition"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}