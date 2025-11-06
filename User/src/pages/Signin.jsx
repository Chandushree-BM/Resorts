"use client";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Direct backend authentication (no Firebase for email/password)
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      alert("Login Successful ✅");
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Login failed ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send to backend
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
        backgroundImage: "url('./signup.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-white/40 "></div>

      <div className="relative z-10 p-[2px] rounded-2xl bg-gradient-to-r from-amber-200 via-rose-100 to-emerald-200 animate-[borderFlow_10s_linear_infinite]">
        <form
          onSubmit={handleSignin}
          className="relative z-10 md:w-96 w-80 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-semibold text-slate-800">Sign In</h2>
          <p className="text-sm text-slate-500 mt-2">
            Welcome back! Please sign in to continue
          </p>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-amber-100 to-rose-100 border border-white/60 flex items-center justify-center h-12 rounded-full hover:scale-105 transition-all disabled:opacity-50"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              className="mr-2"
              alt="googleLogo"
            />
            <span className="text-sm text-slate-700">Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-5 text-slate-500">
            <div className="w-full h-px bg-slate-300"></div>
            <p className="text-sm whitespace-nowrap">or sign in with email</p>
            <div className="w-full h-px bg-slate-300"></div>
          </div>

          {/* Email */}
          <div className="flex items-center w-full border border-slate-300 h-12 rounded-full pl-6 gap-2 bg-white/50 focus-within:border-amber-300 transition-all">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center mt-5 w-full border border-slate-300 h-12 rounded-full pl-6 gap-2 bg-white/50 focus-within:border-amber-300 transition-all">
            <input
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="current-password"
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
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-slate-600 text-sm mt-4">
            Don't have an account?{" "}
            <Link className="text-amber-600 hover:underline" to="/signup">
              Sign up
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
