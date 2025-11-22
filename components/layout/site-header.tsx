import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <FileText className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Exterview
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="#features"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              How it Works
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link className="flex items-center space-x-2" href="/">
              <FileText className="h-6 w-6" />
              <span className="font-bold">Exterview</span>
            </Link>
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="#features"
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                How it Works
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Link href="/start">
              <Button size="sm" className="px-4">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
