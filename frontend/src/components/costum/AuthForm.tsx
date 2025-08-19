"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  mode: "signup" | "login";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url =
        mode === "signup"
          ? "http://localhost:8000/auth/signup"
          : "http://localhost:8000/auth/login";

      const payload = { email, password };
      const res = await axios.post(url, payload);

      console.log(`${mode} successful`, res.data);
    } catch (err: any) {
      console.error(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 capitalize">{mode}</h1>
      <div className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-2"
        >
          {loading ? "Loading..." : mode === "signup" ? "Sign Up" : "Login"}
        </Button>
      </div>
    </div>
  );
}
