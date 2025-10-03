import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-[180px] pb-16 bg-[#FFF5FB]">
      <div className="max-w-[1060px] mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          {/* Hero Content */}
          <div className="max-w-[937px] flex flex-col items-center gap-4">
            <h1 className="text-center text-text-primary text-5xl md:text-[80px] font-extrabold leading-tight md:leading-[88px]">
              Turn words into workflows instantly
            </h1>
            <p className="max-w-[700px] text-center text-text-secondary text-lg md:text-xl font-semibold leading-7">
              Describe your process. Watch it flow. Simplify your work in seconds.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link href="/auth/signup">
              <Button className="h-12 px-14 bg-primary text-background font-medium text-lg shadow-none">
                Start for free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
