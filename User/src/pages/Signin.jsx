"use client";
import { useState } from "react";
<<<<<<< HEAD
import axios from "axios";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
=======
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
>>>>>>> 9eb7f07959a8affa24bbe4da891f187d0566a55b

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
<<<<<<< HEAD
      // Direct backend authentication (no Firebase for email/password)
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
=======
      await signInWithEmailAndPassword(auth, email, password);
>>>>>>> 9eb7f07959a8affa24bbe4da891f187d0566a55b

      alert("Login Successful ✅");
      navigate("/packages"); // ✅ go directly
    } catch (error) {
<<<<<<< HEAD
      alert(error.response?.data?.message || error.message || "Login failed ❌");
=======
      alert(error.message || "Login failed ❌");
>>>>>>> 9eb7f07959a8affa24bbe4da891f187d0566a55b
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
    <div className="relative flex items-center justify-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('./signup.jpg')" }}>

      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative z-10 p-[2px] rounded-2xl bg-gradient-to-r from-amber-200 via-rose-100 to-emerald-200">
        <form onSubmit={handleSignin} className="md:w-96 w-80 flex flex-col bg-white/70 p-8 rounded-2xl">
          
          <h2 className="text-3xl font-semibold text-slate-800">Sign In</h2>

<<<<<<< HEAD
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
=======
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required className="mt-6 border rounded-full p-3" />
>>>>>>> 9eb7f07959a8affa24bbe4da891f187d0566a55b

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
