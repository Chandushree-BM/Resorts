"use client";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      alert("Signup Successful ✅");
      window.location.href = "/signin";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="signup bg"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSignup}
          className="md:w-96 w-80 flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl text-gray-900 font-semibold">Sign Up</h2>

          {/* Google Button */}
          <button
            type="button"
            className="w-full mt-6 bg-white border border-gray-300 flex items-center justify-center h-12 rounded-full hover:bg-gray-100 transition-all"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              className="mr-2"
              alt="google"
            />
            <span className="text-sm text-gray-700">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300"></div>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              or sign up with email
            </p>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          {/* Username */}
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2">
            <FaUserAlt className="text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 mt-5">
            <MdEmail className="text-gray-500 text-base" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 mt-5">
            <FaLock className="text-gray-500 text-sm" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-11 bg-indigo-500 hover:opacity-90 text-white rounded-full transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <Link className="text-indigo-500 hover:underline" to="/signin">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
