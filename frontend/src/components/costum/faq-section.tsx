"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is Flowtype?",
    answer:
      "Flowtype is a simple platform for automating custom contract billing. Set up your workflows, generate invoices, and manage billing easily.",
  },
  {
    question: "Who can use Flowtype?",
    answer:
      "Small businesses, SaaS companies, and service providers who need a quick way to handle custom billing without complex setups.",
  },
  {
    question: "How do I get started?",
    answer:
      "Sign up for the free plan, create your first workflow, and start billing your clients within minutes.",
  },
]

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="w-full flex justify-center items-start bg-[#F9F9F9] py-16">
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-12 px-6">
        {/* Header */}
        <div className="md:flex-1 flex flex-col justify-center gap-4">
          <div className="text-3xl font-semibold text-[#111111]">Frequently Asked Questions</div>
          <div className="text-[#555555] text-base">Quick answers about Flowtype.</div>
        </div>

        {/* FAQ Items */}
        <div className="md:flex-1 flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openItems.includes(index)
            return (
              <div key={index} className="border-b border-[#DDD] overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-[#F0F0F0] transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 text-[#111111] text-base font-medium">{item.question}</div>
                  <ChevronDownIcon
                    className={`w-6 h-6 text-[#555555] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-5 pb-4 text-[#555555] text-sm">{item.answer}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
