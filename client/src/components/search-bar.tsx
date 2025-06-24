import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex">
        <Input
          type="text"
          placeholder="חיפוש נושאים..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-64 pr-4 pl-10 text-right"
        />
        <Button type="submit" size="sm" className="mr-2">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
