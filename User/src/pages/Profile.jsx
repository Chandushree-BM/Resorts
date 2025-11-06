import { FaUserCircle, FaEdit, FaSave, FaTimes, FaEnvelope, FaUser, FaCalendar } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      window.location.href = "/signin";
      return;
    }

    axios.get("http://localhost:5000/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      console.log("Profile data:", res.data);
      setUser(res.data);
      setEditUsername(res.data.username || "");
      setEditEmail(res.data.email || "");
      localStorage.setItem("username", res.data.username || "");
      localStorage.setItem("email", res.data.email || "");
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to load profile");
      setLoading(false);
      if (err.response?.status === 401) {
        localStorage.clear();
        setTimeout(() => window.location.href = "/signin", 1500);
      }
    });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditUsername(user.username || "");
    setEditEmail(user.email || "");
    setIsEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put("http://localhost:5000/api/user/profile", {
        username: editUsername,
        email: editEmail
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      
      setUser(res.data);
      setEditUsername(res.data.username || "");
      setEditEmail(res.data.email || "");
      setIsEditing(false);
      alert("Profile updated successfully! ✅");
    } catch (err) {
      alert("Error updating profile: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-white hover:text-blue-200 transition">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {loading ? (
          // Loading State
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mb-6"></div>
              <div className="h-8 bg-gray-300 rounded w-48 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-64 mb-8"></div>
              <div className="w-full max-w-md space-y-4">
                <div className="h-16 bg-gray-300 rounded-lg"></div>
                <div className="h-16 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          // Error State
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          // Main Profile Card
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            {/* Profile Content */}
            <div className="px-8 pb-8">
              
              {/* Profile Picture */}
              <div className="flex justify-center -mt-16 mb-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <FaUserCircle size={120} className="text-white" />
                  </div>
                  {!isEditing && (
                    <button
                      onClick={handleEdit}
                      className="absolute bottom-0 right-0 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
                    >
                      <FaEdit size={16} />
                    </button>
                  )}
                </div>
              </div>

              {!isEditing ? (
                // ========== VIEW MODE ==========
                <>
                  {/* User Info */}
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                      {user.username || "No Username"}
                    </h1>
                    <p className="text-gray-600 flex items-center justify-center gap-2">
                      <FaEnvelope className="text-indigo-500" />
                      {user.email || "No Email"}
                    </p>
                    <p className="text-sm text-gray-400 mt-2 flex items-center justify-center gap-2">
                      <FaCalendar className="text-gray-400" />
                      Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "N/A"}
                    </p>
                  </div>

                  {/* Info Cards */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {/* Username Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-indigo-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                          <FaUser className="text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Username</p>
                          <p className="text-lg font-semibold text-gray-800">{user.username || "Not set"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Email Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <FaEnvelope className="text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Email Address</p>
                          <p className="text-lg font-semibold text-gray-800">{user.email || "Not set"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleEdit}
                      className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg font-semibold"
                    >
                      <FaEdit size={20} /> Edit Profile
                    </button>
                    
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to logout?')) {
                          localStorage.clear();
                          window.location.href = "/signin";
                        }
                      }}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition shadow-lg font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                // ========== EDIT MODE ==========
                <>
                  <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Your Profile</h2>
                  
                  <div className="max-w-md mx-auto space-y-6">
                    {/* Username Input */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FaUser className="text-indigo-500" />
                        Username
                      </label>
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition"
                        placeholder="Enter your username"
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FaEnvelope className="text-purple-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaSave size={18} /> {saving ? "Saving..." : "Save Changes"}
                      </button>
                      
                      <button
                        onClick={handleCancel}
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transition shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaTimes size={18} /> Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        )}

        {/* Account Info Footer */}
        {!loading && !error && (
          <div className="mt-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Account Type:</span> {user.authProvider === 'google' ? '🔗 Google Account' : '📧 Email Account'}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
