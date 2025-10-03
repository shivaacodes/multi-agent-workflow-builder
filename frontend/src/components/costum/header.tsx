import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full border-b border-lines bg-background">
      <div className="max-w-[1060px] mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-extrabold text-text-primary">
              <span className="text-[#FF0080]">f</span>low
              <span className="text-[#FF0080]">t</span>ype
            </div>
          </div>
          <Button variant="ghost" className="text-text-primary hover:bg-secondary/10">
            Log in
          </Button>
        </nav>
      </div>
    </header>
  )
}
