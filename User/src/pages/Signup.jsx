import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

"use client";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div
      className="relative flex items-center justify-center h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('./signup.jpg')"// your resort image
      }}
    >
      {/* Soft overlay for blending */}
      <div className="absolute inset-0 bg-white/40 "></div>

      {/* Animated light border */}
      <div className="relative z-10 p-[2px] rounded-2xl bg-gradient-to-r from-amber-200 via-rose-100 to-emerald-200 animate-[borderFlow_10s_linear_infinite]">
        <form className="relative z-10 md:w-96 w-80 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold text-slate-800">Sign up</h2>
          <p className="text-sm text-slate-500 mt-2">
            Create your account to continue
          </p>
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      alert("User Registered Successfully ✅");
      console.log("User:", res.data);

      setUsername("");
      setEmail("");
      setPassword("");

      window.location.href = "/login"; // redirect

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[700px] w-full">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSignup}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign up</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Create your account to continue
          </p>

          {/* Google Button */}
          <button
            type="button"
            className="w-full mt-8 bg-gradient-to-r from-amber-100 to-rose-100 border border-white/60 flex items-center justify-center h-12 rounded-full hover:scale-105 transition-all"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>
          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-5 text-slate-500">
            <div className="w-full h-px bg-slate-300"></div>
            <p className="text-sm whitespace-nowrap">or sign up with email</p>
            <div className="w-full h-px bg-slate-300"></div>
          </div>
          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="text-sm text-gray-500/90 whitespace-nowrap">
              or sign up with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* Username */}
          <div className="flex items-center w-full border border-slate-300 h-12 rounded-full pl-6 pr-4 gap-2 focus-within:border-amber-300 bg-white/30 transition-all">
            <FaUserAlt className="text-slate-500 text-sm" />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full"
              required
            />
          </div>
          {/* Username */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <svg width="17" height="17">
              <path
                d="M8.5 8.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 2c-3.037 0-6.5 1.397-6.5 3.5V15H15v-1c0-2.103-3.463-3.5-6.5-3.5Z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center w-full border border-slate-300 h-12 rounded-full pl-6 pr-4 gap-2 mt-6 focus-within:border-amber-300 bg-white/50 transition-all">
            <MdEmail className="text-slate-500 text-base" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full"
              required
            />
          </div>
          {/* Email */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2 mt-6">
            <svg width="16" height="11">
              <path
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center mt-6 w-full border border-slate-300 h-12 rounded-full pl-6 pr-4 gap-2 focus-within:border-amber-300 bg-white/50 transition-all">
            <FaLock className="text-slate-500 text-sm" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full"
              required
            />
          </div>
          {/* Password */}
          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <svg width="13" height="17">
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full"
              required
            />
          </div>

          {/* Options */}
          <div className="w-full flex items-center justify-between mt-8 text-slate-600 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input className="h-4 w-4 accent-amber-300" type="checkbox" />
              Remember me
            </label>
            <a className="underline hover:text-amber-500" href="#">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white font-semibold bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 shadow-lg transition-all"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {/* to link singun page */}

            <p className="text-gray-500/90 text-sm mt-4">   
            Already have an account?{""}
            <Link to='/' className="text-indigo-400 hover:underline" >
              Sign in
            </Link>
          </p>  

        </form>
      </div>
    </div>
  );
}
