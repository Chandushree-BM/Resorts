import { Link } from "react-router-dom";

export default function About() {
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

      <section className="relative bg-[url('/landing/land.jpeg')] bg-cover bg-center text-white min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-4 md:px-12 py-20">
          <h1 className="text-4xl md:text-5xl font-berkshire text-center mb-4">
            About EL-MARIO RESORT
          </h1>
          <p className="text-center text-base md:text-lg text-slate-200 max-w-2xl mx-auto">
            A serene coastal escape blending luxury, comfort, and natural beauty — crafted to give you 
            moments you’ll never forget. Where every sunrise whispers calm, and every sunset glows with joy.
          </p>

          {/* About Section */}
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 mt-16">
  {/* Image Section */}
  <div className="flex flex-col gap-6">
    <img
      className="max-w-sm w-full rounded-xl h-auto shadow-lg border border-white/20"
      src="./landing/land2.jpeg"
      alt="Resort Pool View"
    />
    <img
      className="max-w-sm w-full rounded-xl h-auto shadow-lg border border-white/20"
      src="./landing/land10.jpeg"
      alt="Beachfront Dining"
    />
    <img
      className="max-w-sm w-full rounded-xl h-auto shadow-lg border border-white/20"
      src="./landing/land11.jpeg"
      alt="Beachfront spa"
    />
  </div>
  
 
            
  {/* Text Section */}
  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-md max-w-lg">
    <h2 className="text-3xl font-berkshire mb-3 text-blue-200">
      Experience True Coastal Luxury
    </h2>
    <p className="text-sm md:text-base text-slate-100 leading-relaxed">
      EL-MARIO RESORT was founded with one dream — to create a paradise where elegance and 
      comfort meet the sea. Our resort combines scenic beachfront views, world-class amenities, 
      and personalized service to ensure your stay feels like HOME in HEAVEN.
    </p>

    <div className="flex flex-col gap-8 mt-8">
      <div className="flex items-center gap-4">
        <div className="size-9 p-2 bg-blue-100/20 border border-blue-200/30 rounded">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
            alt=""
          />
        </div>
        <div>
          <h3 className="text-base font-medium text-blue-200">Beachfront Serenity</h3>
          <p className="text-sm text-slate-200">
            Wake up to the soothing sound of waves and breathtaking ocean views.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="size-9 p-2 bg-blue-100/20 border border-blue-200/30 rounded">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
            alt=""
          />
        </div>
        <div>
          <h3 className="text-base font-medium text-blue-200">Gourmet Dining</h3>
          <p className="text-sm text-slate-200">
            Relish fresh seafood and local delicacies prepared by master chefs.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="size-9 p-2 bg-blue-100/20 border border-blue-200/30 rounded">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
            alt=""
          />
        </div>
        <div>
          <h3 className="text-base font-medium text-blue-200">Wellness & Spa</h3>
          <p className="text-sm text-slate-200">
            Rejuvenate body and soul with holistic spa experiences inspired by nature.
          </p>
        </div>
      </div>
    </div>

    <Link
      to="/packages"
      className="inline-block mt-10 bg-white text-blue-800 hover:bg-blue-100 px-8 py-3 rounded-full font-medium transition"
    >
      Explore Our Packages
    </Link>
  </div>
</div>
 <div className="text-center mt-16">
            <Link
              to="/"
              className="inline-block bg-blue-100/20 text-white border border-white/30 px-8 py-3 rounded-full hover:bg-blue-200/30 transition"
            >
              ← Back to Home
            </Link>
          </div>
 </div>
      </section>
    </>
  );
}