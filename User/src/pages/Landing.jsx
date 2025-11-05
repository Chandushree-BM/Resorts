import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin"); // NOT logged in → go signin
    } else {
      navigate("/packages"); // Logged in → see packages
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Prata&display=swap');
        * {
          font-family: 'Tenor Sans', sans-serif;
        }
        .font-heading {
          font-family: 'Prata', serif;
          font-weight: 400;
          letter-spacing: 0.6px;
        }
      `}</style>

      <section className="relative flex flex-col items-center pb-48 text-center text-sm text-white max-md:px-2 overflow-hidden">

        <img
          src="./landing/land0.jpeg"
          alt="Resort"
          className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-110 saturate-125"
        />

        <div className="absolute inset-0 bg-black/35"></div>

        <div className="relative z-10 w-full flex flex-col items-center">
          
          <nav className="flex justify-between items-center px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-white/20 w-full bg-black/30 backdrop-blur-sm">
            <Link to="/" className="text-2xl text-white font-bold">
              EL-MARIO RESORT
            </Link>

            <div className="hidden md:flex gap-6 text-white font-medium">
              <Link to="/" className="px-6 py-2 rounded-full bg-gray-200 text-slate-800">Home</Link>
              <Link to="/about" className="px-6 py-2 rounded-full bg-gray-200 text-slate-800">About</Link>
              <Link to="/packages" className="px-6 py-2 rounded-full bg-gray-200 text-slate-800">Packages</Link>
              <Link to="/contact" className="px-6 py-2 rounded-full bg-gray-200 text-slate-800">Contact</Link>
            </div>
          </nav>

          <h1 className="font-heading text-[45px]/[52px] md:text-6xl/[65px] mt-24">
            Experience Paradise at EL-MARIO RESORT.
          </h1>

          <p className="text-base mt-3 max-w-xl">
            Escape to luxury and nature at once — beachfront villas, gourmet dining & serenity.
          </p>

          <button
            onClick={handleBookNow}
            className="mt-8 bg-white text-black hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full font-medium transition transform hover:scale-105 shadow-lg"
          >
            Book Now
          </button>
        </div>
      </section>
    </>
  );
}
