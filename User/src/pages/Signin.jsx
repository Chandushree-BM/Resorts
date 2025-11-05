"use client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful ✅");
      navigate("/packages"); // ✅ go directly
    } catch (error) {
      alert(error.message || "Login failed ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('./signup.jpg')" }}>

      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative z-10 p-[2px] rounded-2xl bg-gradient-to-r from-amber-200 via-rose-100 to-emerald-200">
        <form onSubmit={handleSignin} className="md:w-96 w-80 flex flex-col bg-white/70 p-8 rounded-2xl">
          
          <h2 className="text-3xl font-semibold text-slate-800">Sign In</h2>

          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required className="mt-6 border rounded-full p-3" />

          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required className="mt-4 border rounded-full p-3" />

          <button disabled={loading} type="submit"
            className="mt-6 bg-indigo-600 text-white py-3 rounded-full">
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-sm mt-3">
            No account? <Link to="/signup" className="text-indigo-500">Signup</Link>
          </p>

          <Link to="/" className="text-center mt-6 text-indigo-600">
            ← Back to Home
          </Link>
        </form>
      </div>
    </div>
  );
}
