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
  const router= useRouter()

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url =
        mode === "signup"
          ? "http://localhost:8000/auth/signup"
          : "http://localhost:8000/auth/login";

      const payload = { email, password };
      const res = await axios.post(url, payload);

      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
      }

      console.log(`${mode} successful`, res.data);

      if (mode=="login"){
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-48 p-6 lg:p-8 border rounded-3xl shadow-sm bg-card dark:bg-card-dark">
      <h1 className="text-3xl font-bold mb-6 capitalize text-center">{mode}</h1>
      <div className="space-y-6">
        <div>
          <Label className="text-xl">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="text-base"
          />
        </div>
        <div>
          <Label className="text-xl">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="secret"
            className="text-base"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-4 text-2xl"
        >
          {loading ? "Loading..." : mode === "signup" ? "Sign Up" : "Login"}
        </Button>
      </div>
    </div>
  );
}
