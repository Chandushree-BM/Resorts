"use client";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      alert("Login Successful ✅");
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";

    } catch (error) {
      alert(error.response?.data?.message || "Login failed ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[700px] w-full">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSignin}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please sign in to continue
          </p>

          {/* ✅ Google Login Button */}
          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="text-sm text-gray-500/90 whitespace-nowrap">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* Email */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="email"
              placeholder="Email id"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account?{" "}
            <Link className="text-indigo-400 hover:underline" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
