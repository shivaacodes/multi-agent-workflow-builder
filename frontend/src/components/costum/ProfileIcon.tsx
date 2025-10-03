"use client";

import { useState, useEffect } from "react";
import { getMe } from "@/lib/api";

export default function ProfileIcon() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getMe();
        setEmail(res.data.email);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-2">
      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      <span>{email}</span>
    </div>
  );
}
