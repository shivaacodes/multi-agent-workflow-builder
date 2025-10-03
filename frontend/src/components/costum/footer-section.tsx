export default function FooterSection() {
  return (
    <footer className="w-full bg-white border-t border-[#e0dedb] py-12">
      <div className="max-w-[1060px] mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        {/* Brand & Tagline */}
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold text-[#111111]">flowtype</div>
          <div className="text-sm text-[#555555]">Type it. See it. Flow it.</div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-[#49423D]">
          <a href="#" aria-label="Twitter" className="hover:text-[#FF0080] transition-colors duration-200">Twitter</a>
          <a href="#" aria-label="LinkedIn" className="hover:text-[#FF0080] transition-colors duration-200">LinkedIn</a>
          <a href="#" aria-label="GitHub" className="hover:text-[#FF0080] transition-colors duration-200">GitHub</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-[#888888]">
        © {new Date().getFullYear()} Flowtype. All rights reserved.
      </div>
    </footer>
  )
}
