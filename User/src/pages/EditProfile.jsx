import { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      window.location.href = "/signin";
      return;
    }

    // Fetch current user data from API
    axios.get("http://localhost:5000/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      console.log("User data for editing:", res.data);
      setUsername(res.data.username || "");
      setEmail(res.data.email || "");
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching profile:", err);
      alert("Failed to load profile data");
      setLoading(false);
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/signin";
      }
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/api/user/profile", {
        username, email
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Profile updated successfully!");
      window.location.href = "/profile";
    } catch (err) {
      alert("Error updating profile: " + (err.response?.data?.message || err.message));
      setSaving(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-xl w-[350px]">
        <h2 className="text-xl font-bold text-center mb-4">Edit Profile</h2>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded mb-3"></div>
            <div className="h-10 bg-gray-300 rounded mb-3"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text"
              className="border border-gray-300 p-2 w-full mb-3 rounded focus:outline-none focus:border-blue-500" 
              value={username || ""} 
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:border-blue-500" 
              value={email || ""} 
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />

            <button 
              type="submit"
              disabled={saving}
              className="bg-blue-600 w-full py-2 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <a 
              href="/profile" 
              className="block text-center mt-3 text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancel
            </a>
          </>
        )}
      </form>
    </div>
  );
}
