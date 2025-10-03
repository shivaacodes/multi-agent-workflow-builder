"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "signup" | "login";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const url =
        mode === "signup"
          ? "http://localhost:8000/auth/signup"
          : "http://localhost:8000/auth/login";

      const payload = { email, password };
      const res = await axios.post(url, payload);

      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
        router.push(mode === "signup" ? "/dashboard" : "/workflows");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] px-4">
      <div className="w-full max-w-md p-8 border border-[#e0dedb] bg-white shadow-sm">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="absolute top-4 left-4 text-sm font-medium text-[#49423d] hover:bg-[#F0EDEE]"
        >
          &larr; Back
        </Button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#111111] mb-6 uppercase">
          {mode === "signup" ? "Sign up" : "Log in"}
        </h1>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <Label className="text-sm font-medium text-[#49423d]">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 text-base border-[#49423d] focus:border-[#FF0080] focus:ring-0 rounded-none"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-[#49423d]">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 text-base border-[#49423d] focus:border-[#FF0080] focus:ring-0 rounded-none"
            />
          </div>

          {error && (
            <p className="text-sm text-[#FF0080] font-medium">{error}</p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 text-base font-semibold bg-[#FF0080] hover:bg-[#e60073] text-white rounded-none"
          >
            {loading ? "Loading..." : mode === "signup" ? "Sign Up" : "Log In"}
          </Button>
        </div>
      </div>
    </div>
  );
}
