"use client";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function Landing() {

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <style>{`
@import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Prata&display=swap');

* {
  font-family: 'Tenor Sans', sans-serif;
  scroll-behavior: smooth;
}

.font-heading {
  font-family: 'Prata', serif;
  font-weight: 400;
  letter-spacing: 0.6px;
}


@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  animation: fadeInUp 1.2s ease-out forwards;
}

.parallax {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}


@keyframes shine {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}


.wave-divider {
  position: relative;
  height: 80px;
  background: linear-gradient(to bottom, #fff 50%, #e0f7ff 50%);
}
.wave-divider::before {
  content: "";
  position: absolute;
  top: -20px;
  width: 100%;
  height: 100%;
  background: url('https://svgshare.com/i/xFz.svg') repeat-x;
  background-size: contain;
  animation: wave 10s linear infinite;
}
@keyframes wave {
  0% { background-position-x: 0; }
  100% { background-position-x: 1000px; }
}
`}</style>

            <section className="relative flex flex-col items-center pb-48 text-center text-sm text-white max-md:px-2 overflow-hidden">

                <img src="./landing/land0.jpeg" alt="Resort Background" className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-110 saturate-125" />
                <div className="absolute inset-0 bg-black/35"></div>

                <div className="relative z-10 w-full flex flex-col items-center">

                    {/* 🌊 Navigation Bar */}
                    <nav className="flex justify-between items-center px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-white/20 w-full bg-black/30 backdrop-blur-sm">

                        <a href="#" className="text-2xl font-berkshire tracking-wide text-white">
                            EL-MARIO RESORT
                        </a>

            <div className="hidden md:flex gap-6 text-white font-medium">
              {["Home", "About", "Packages", "Contact"].map((item, i) => (
                <Link
                  key={i}
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-[#1CC6E8] transition duration-200 relative group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#1CC6E8] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </motion.nav>

                    {/* Guests Section */}
                    <Link to="/testimonials">
                        <div className="flex flex-wrap items-center justify-center p-1.5 mt-24 md:mt-28 rounded-full border border-slate-300 text-xs bg-black/30 backdrop-blur-sm cursor-pointer transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            <div className="flex items-center">
                                <img className="size-7 rounded-full border-3 border-white" src="https://images.unsplash.com/photo-500648767791-00dcc994a43e?w=50&q=80" alt="guest1" />
                                <img className="size-7 rounded-full border-3 border-white -translate-x-2" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&q=80" alt="guest2" />
                                <img className="size-7 rounded-full border-3 border-white -translate-x-4" src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=50&q=80" alt="guest3" />
                            </div>
                            <p className="-translate-x-2">Trusted by happy guests of EL-MARIO</p>
                        </div>
                    </Link>

          {/* HERO TEXT */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-heading text-[48px]/[56px] md:text-6xl/[70px] mt-8 max-w-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
          >
            Experience Paradise <br /> at EL-MARIO RESORT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-base mt-4 max-w-xl text-gray-200"
          >
            Discover where luxury meets serenity — unwind in oceanfront villas, indulge in fine cuisine, and let the waves sing you to peace. <br /><br />
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="/signup"
              className="mt-8 bg-gradient-to-r from-[#48D6E0] via-[#1CC6E8] to-[#009DC5] bg-[length:200%_auto] animate-shine text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-500"
              style={{
                backgroundImage: "linear-gradient(90deg, #48D6E0, #00AEDD, #1CC6E8, #009DC5)",
                backgroundSize: "200% auto",
                animation: "shine 3s linear infinite",
              }}
            >
              Book Your Stay
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🌊 Wave Divider */}
      <div className="wave-divider"></div>

      {/* 🌴 TOP PICKS */}
      <section className="relative text-center py-24 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
        <img
          src="./landing/land0.jpeg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm"
        />

        <div className="relative z-10">
          <h2 className="text-4xl font-heading text-slate-800 mb-12 fade-in-up">
            Our Signature Experiences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Ocean View Villa",
                img: "https://media.architecturaldigest.in/wp-content/uploads/2019/06/Bali-villa-Uluwatu-SAOTA.jpg",
                text: "Wake up to the sound of waves in a luxurious oceanfront villa.",
                link: "/rooms",
                btn: "Explore →",
              },
              {
                title: "Private Beach Cabana",
                img: "https://a.cdn-hotels.com/gdcs/production50/d535/172cb39f-200a-4bed-8911-353860c517c2.jpg",
                text: "Your private escape — golden sands, ocean breeze, pure bliss.",
                link: "/cabana",
                btn: "View Details →",
              },
              {
                title: "Infinity Pool Suite",
                img: "https://tse4.mm.bing.net/th/id/OIP.49uMKRnv1QTqDrCBl8okQQHaEK?pid=Api&P=0&h=180",
                text: "Luxury meets tranquility — swim above the sea in style.",
                link: "/suites",
                btn: "Discover →",
              },
              {
                title: "Sunset Dining Deck",
                img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
                text: "Savor fine dining and golden skies — romance redefined.",
                link: "/dining",
                btn: "See More →",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="p-6 text-left">
                  <h3 className="font-heading text-lg mb-2 text-slate-900">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{card.text}</p>
                  <Link to={card.link} className="text-[#009DC5] font-medium hover:underline">
                    {card.btn}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌅 FOOTER */}
      <footer className="relative text-white text-center py-10 mt-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#48D6E0]/90 via-[#1CC6E8]/85 to-[#009DC5]/90"></div>

        <div className="relative z-10 drop-shadow-md">
          <p>© 2025 EL-MARIO RESORT. All rights reserved.</p>
          <p className="mt-2 text-sm text-blue-50">Designed with ❤️ by EL-MARIO Web Team</p>
        </div>
      </footer>
    </>
  );
}
