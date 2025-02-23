"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import React from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("Success");
      
      await axios.post("/api/users/signup", user);
      toast.success("Signup successful!");
      router.push("/login");   
    } catch (error:any) {
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <h1>{loading ? "Loading..." : "Signup"}</h1>
      <hr />

      <label htmlFor="username">Username</label>
      <input 
        className="py-2 border border-gray-300 rounded-lg mt-4 text-black mb-2 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />

      <label htmlFor="email">Email</label>
      <input 
        className="py-2 border border-gray-300 rounded-lg mt-4 mb-2 text-black focus:outline-none focus:border-gray-600"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input 
        className="py-2 border border-gray-300 rounded-lg text-black mt-4 mb-2 focus:outline-none focus:border-gray-600"
        type="password" 
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <button 
        onClick={onSignup}
        disabled={buttonDisabled || loading} 
        className={`py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 
          ${buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Signing Up..." : buttonDisabled ? "No SignUp" : "Sign Up"}
      </button>

      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
