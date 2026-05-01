"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple client-side auth for the prototype
  // In a real production app, use NextAuth or Supabase Auth middleware
  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Using a simple hardcoded password for now since it's a free prototype
    if (password === "freshco123") {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-sand/50 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-ocean/10 text-ocean rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ocean mb-2">Admin Access</h1>
          <p className="text-ocean/60 mb-8">Please enter the password to access the dashboard.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors text-center"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button type="submit" className="w-full bg-ocean text-gold py-3 rounded font-bold uppercase tracking-wider hover:bg-ocean-light transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <div className="bg-ocean text-offwhite py-4 border-b border-ocean-light">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <h1 className="font-serif text-2xl font-bold text-gold">FRESHCO Admin</h1>
          <button 
            onClick={() => {
              sessionStorage.removeItem("adminAuth");
              setIsAuthenticated(false);
            }}
            className="text-sm text-sand hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
