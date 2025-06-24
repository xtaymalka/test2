import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/search-bar";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "בית", href: "/" },
    { name: "לפי נושא", href: "/topics" },
    { name: "לפי גיל", href: "/topics/age/all" },
    { name: "ארכיון", href: "/archive" },
    { name: "עלינו", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-reverse space-x-4">
            <div className="flex items-center">
              <span className="text-2xl ml-2">🧠</span>
              <h1 className="text-2xl font-bold text-primary font-alef">ידע ליום</h1>
              <span className="text-sm text-gray-500 font-assistant mr-2">Daily Knowledge</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "font-medium transition-colors relative",
                  isActive(item.href)
                    ? "text-primary border-b-2 border-primary pb-4 -mb-4"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <SearchBar />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 font-medium transition-colors",
                  isActive(item.href) ? "text-primary" : "text-gray-700 hover:text-primary"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
