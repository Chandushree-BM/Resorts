import { Link } from "react-router-dom";


export default function Landing() {
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


            {/* Main Section */}
            <section className="relative flex flex-col items-center pb-48 text-center text-sm text-white max-md:px-2 overflow-hidden">
                
                {/* Background image */}
                <img 
                    src="./landing/land0.jpeg" 
                    alt="Resort Background" 
                    className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-110 saturate-125"
                />

                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/35"></div>

                {/* Content Wrapper */}
                <div className="relative z-10 w-full flex flex-col items-center">

                    {/* 🌊 Navigation Bar */}
                    <nav className="flex justify-between items-center px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-white/20 w-full bg-black/30 backdrop-blur-sm">
                        
                        {/* Logo / Resort Name */}
                        <a href="#" className="text-2xl font-berkshire tracking-wide text-white">
                            EL-MARIO RESORT
                        </a>

                        {/* Navbar Links */}
                        <div className="hidden md:flex gap-6 text-white font-medium">
                            <a 
                                href="#"
                                className="bg-gray-200 text-slate-800 px-6 py-2.5 rounded-full transition hover:bg-white hover:text-blue-600"
                            >
                                Home
                            </a>
                           <Link
                            to="/about"
                        className="bg-gray-200 text-slate-800 px-6 md:px-8 py-2.5 rounded-full font-medium
                         transition hover:bg-white hover:text-blue-600">
                                                  About
</Link>

                            <a 
                                href="#packages"
                                className="bg-gray-200 text-slate-800 px-6 py-2.5 rounded-full transition hover:bg-white hover:text-blue-600"
                            >
                                Packages
                            </a>
                            <Link
  to="/contact"
  className="bg-gray-200 text-slate-800 px-6 md:px-8 py-2.5 rounded-full font-medium transition hover:bg-white hover:text-blue-600"
>
  Contact
</Link>
<Link to="/add-review" className="hover:text-blue-400 bg-gray-200 text-slate-800 px-6 md:px-8 py-2.5 rounded-full font-medium transition">
  Add Review
</Link>


</div>
</nav>

                    {/* Guests Section */}
                    {/* Guests Section */}
<Link to="/testimonials">
  <div className="flex flex-wrap items-center justify-center p-1.5 mt-24 md:mt-28 rounded-full border border-slate-300 text-xs bg-black/30 backdrop-blur-sm cursor-pointer transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
      <div className="flex items-center">
          <img
              className="size-7 rounded-full border-3 border-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80"
              alt="guest1"
          />
          <img
              className="size-7 rounded-full border-3 border-white -translate-x-2"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&q=80"
              alt="guest2"
          />
          <img
              className="size-7 rounded-full border-3 border-white -translate-x-4"
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=50&q=80"
              alt="guest3"
          />
      </div>
      <p className="-translate-x-2">Trusted by happy guests of EL-MARIO</p>
  </div>
</Link>


                    {/* Hero Title */}
                    <h1 className="font-berkshire text-[45px]/[52px] md:text-6xl/[65px] mt-6 max-w-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                        Experience Paradise at <br></br> EL-MARIO RESORT.
                    </h1>

                    {/* Subtext */}
                    <p className="text-base mt-2 max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                        Escape to tranquility where luxury meets nature. 
                        Unwind in beachfront villas, savor fine cuisine, and embrace serenity.
                    </p>

                    <p className="text-base mt-3 md:mt-7 max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                        Reserve your dream getaway today — exclusive offers for early bookings!
                    </p>

                    <br />

                   <Link
                    to="/signup"
                    className="bg-white text-slate-800 hover:bg-blue-500 hover:text-white px-6 md:px-8 py-2.5 rounded-full font-medium transition"
                                        >Book Now
                                
                                
                        </Link>

                </div>
            </section>
        </>
    );
};