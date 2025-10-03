"use client"

import { useState } from "react"

import { handlePayment } from "../../lib/payment";

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly")

  const pricing = {
    free: { monthly: 0, annually: 0 },
    paid: { monthly: 5, annually: 5 * 12 },
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8 py-12 bg-[#F9F9F9]">
      {/* Header */}
      <div className="text-center max-w-2xl px-6">
        <div className="text-3xl md:text-5xl font-semibold text-[#111111] mb-4">
          Choose the perfect plan for your workflow
        </div>
        <div className="text-[#555555] text-base">
          Start with basic diagrams, upgrade for unlimited possibilities.
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-6 px-6 w-full max-w-4xl">
        {/* Free Plan */}
        <div className="flex-1 border border-[#DDD] bg-white p-6 flex flex-col gap-6">
          <div className="text-lg font-medium text-[#111111]">Free Tier</div>
          <div className="text-sm text-[#555555]">Basic diagrams (max 3 workflows, no export)</div>
          <div className="text-4xl font-serif text-[#111111]">$0 / ₹0</div>
          <div className="text-sm text-[#777777]">per month</div>
          <button className="w-full py-2 bg-[#FF0080] text-white font-medium">
            Start for free
          </button>
          <ul className="text-sm text-[#555555] list-disc pl-5 flex flex-col gap-1">
            <li>Max 3 workflows</li>
            <li>Basic diagramming tools</li>
            <li>Community support</li>
          </ul>
        </div>

        {/* Paid Plan */}
        <div className="flex-1 border border-[#DDD] bg-[#FF0080] p-6 flex flex-col gap-6 text-white">
          <div className="text-lg font-medium">Paid Tier</div>
          <div className="text-sm text-[#F0EDEE]">Unlimited workflows + export (JSON / PNG)</div>
          <div className="text-4xl font-serif">$5 / ₹120</div>
          <div className="text-sm text-[#F0EDEE]">per month</div>
          <button
            className="w-full py-2 bg-white text-[#FF0080] font-medium"
            onClick={handlePayment}
          >
            Get started
          </button>
          <ul className="text-sm text-[#F0EDEE] list-disc pl-5 flex flex-col gap-1">
            <li>Unlimited workflows</li>
            <li>Export (JSON / PNG)</li>
            <li>Priority support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
