"use client";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Register user directly in backend (no Firebase for email/password)
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password
      });
      
      alert("Signup Successful ✅");
      window.location.href = "/signin";
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send to backend to store in database
      const res = await axios.post("http://localhost:5000/api/auth/google-auth", {
        username: user.displayName,
        email: user.email,
        firebaseUid: user.uid
      });

      localStorage.setItem("token", res.data.token);
      alert("Google Sign-in Successful ✅");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Google sign-in failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('./signup.jpg')", // Resort image
      }}
    >
      {/* Soft light overlay for better contrast */}
      <div className="absolute inset-0 bg-white/40 "></div>

      {/* Outer animated gradient border */}
      <div className="relative z-10 p-[2px] rounded-2xl bg-gradient-to-r from-amber-200 via-rose-100 to-emerald-200 animate-[borderFlow_10s_linear_infinite]">
        <form
          onSubmit={handleSignup}
          className="relative z-10 md:w-96 w-80 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-semibold text-slate-800">Sign Up</h2>
          <p className="text-sm text-slate-500 mt-2">
            Create your account to continue
          </p>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-amber-100 to-rose-100 border border-white/60 flex items-center justify-center h-12 rounded-full hover:scale-105 transition-all disabled:opacity-50"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              className="mr-2"
              alt="google"
            />
            <span className="text-sm text-slate-700">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-5 text-slate-500">
            <div className="w-full h-px bg-slate-300"></div>
            <p className="text-sm whitespace-nowrap">or sign up with email</p>
            <div className="w-full h-px bg-slate-300"></div>
          </div>

          {/* Username */}
          <div className="flex items-center w-full border border-slate-300 h-12 rounded-full pl-6 gap-2 focus-within:border-amber-300 bg-white/50 transition-all">
            <FaUserAlt className="text-slate-500 text-sm" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center w-full border border-slate-300 h-12 rounded-full pl-6 gap-2 mt-5 focus-within:border-amber-300 bg-white/50 transition-all">
            <MdEmail className="text-slate-500 text-base" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center w-full border border-slate-300 h-12 rounded-full pl-6 gap-2 mt-5 focus-within:border-amber-300 bg-white/50 transition-all">
            <FaLock className="text-slate-500 text-sm" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-11 rounded-full text-white font-semibold bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 shadow-lg transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>
            <p className="text-sm text-center mt-4 text-white">
  Already have an account?{" "}
  <Link to="/signin" className="text-blue-400 hover:text-blue-600 font-medium">
    Sign in
  </Link>
</p>
<div className="text-center mt-16">
            <Link
              to="/"
              className="inline-block bg-amber-100/20 text-amber-400 border border-white/30 px-8 py-3 rounded-full hover:bg-amber-200/30 transition"
            >
              ← Back to Home
            </Link>
          </div>

          
        </form>
      </div>
    </div>
  );
}