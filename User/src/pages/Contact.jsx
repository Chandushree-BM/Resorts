import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      toast.error("Please fill all fields");
      return;
    }
    setSending(true);
    try {
      await axios.post("http://localhost:5000/api/messages", { name, email, message: msg });
      toast.success("Message sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMsg("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setSending(false);
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

      <section className="relative bg-[url('/landing/land.jpeg')] bg-cover bg-center text-white min-h-screen flex flex-col justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20">
          <h1 className="text-4xl md:text-5xl font-heading text-center mb-6">
            Contact <span className="text-blue-300">EL-MARIO RESORT</span>
          </h1>
          <p className="text-center text-base md:text-lg text-slate-200 max-w-2xl mx-auto mb-12">
            Have a question, booking inquiry, or just want to say hello?  
            We’d love to hear from you. Our team is here to make your experience seamless.
          </p>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Contact Info */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-md">
              <h2 className="text-2xl font-heading mb-4 text-blue-200">Get in Touch</h2>
              <p className="text-slate-100 mb-6">
                Reach out to us anytime — whether it’s for booking details, resort activities, or event planning.
                Our guest services team is available 24/7.
              </p>

              <ul className="space-y-5">
                <li className="flex items-center gap-4">
                  <span className="text-2xl">📍</span>
                  <p className="text-slate-100">Colva beach, South Goa, India</p>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-2xl">📞</span>
                  <p className="text-slate-100">+91 1234567890</p>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-2xl">✉️</span>
                  <p className="text-slate-100">MarioEl@elmarioresort.com</p>
                </li>
              </ul>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3 text-blue-200">Follow Us</h3>
                <div className="flex gap-5 text-2xl hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]
">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/elmarioresort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                  >
                    <FaFacebookF />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/elmarioresort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition"
                  >
                    <FaInstagram />
                  </a>

                  {/* Twitter (real bird icon 🐦) */}
                  <a
                    href="https://twitter.com/elmarioresort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition"
                  >
                    <FaTwitter />
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@elmarioresort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-400 transition"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-md">
              <h2 className="text-2xl font-heading mb-4 text-blue-200">Send Us a Message</h2>
              <form className="flex flex-col gap-5" onSubmit={submit}>
                <div>
                  <label className="block mb-1 text-slate-200 text-sm">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-slate-300 outline-none focus:border-blue-300"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-200 text-sm">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-slate-300 outline-none focus:border-blue-300"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-200 text-sm">Message</label>
                  <textarea
                    rows="4"
                    placeholder="Your message..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-slate-300 outline-none focus:border-blue-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-4 bg-white text-blue-800 hover:bg-blue-100 px-8 py-3 rounded-full font-medium transition disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
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