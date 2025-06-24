import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TopicCard from "@/components/topic-card";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import { Link } from "wouter";
import type { Topic } from "@shared/schema";

export default function Search() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  // Extract query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const q = urlParams.get('q') || '';
    setSearchQuery(q);
    setActiveQuery(q);
  }, [location]);

  const { data: searchResults, isLoading } = useQuery<Topic[]>({
    queryKey: [`/api/search?q=${encodeURIComponent(activeQuery)}`],
    enabled: activeQuery.length > 0,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery.trim());
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/" className="text-primary hover:text-blue-600 inline-flex items-center">
          <ArrowRight className="w-4 h-4 ml-1" />
          בית
        </Link>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-alef mb-2">
          חיפוש נושאים
        </h1>
        <p className="text-gray-600">
          חפשו בין כל הנושאים והמאמרים שלנו
        </p>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="הקלידו מילות חיפוש - נושאים, תגיות או תוכן..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-right text-lg"
              />
            </div>
            <Button type="submit" size="lg">
              <SearchIcon className="w-5 h-5 ml-2" />
              חפש
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {activeQuery && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 font-alef mb-2">
              תוצאות חיפוש עבור: "{activeQuery}"
            </h2>
            {!isLoading && (
              <p className="text-gray-600">
                נמצאו {searchResults?.length || 0} תוצאות
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-alef">
                  לא נמצאו תוצאות
                </h3>
                <p className="text-gray-600 mb-6">
                  לא מצאנו נושאים שמתאימים לחיפוש שלכם. נסו מילות חיפוש אחרות או עיינו בכל הנושאים.
                </p>
                <Link href="/topics">
                  <Button>עיינו בכל הנושאים</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Search Suggestions */}
      {!activeQuery && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 font-alef mb-6">
            הצעות לחיפוש
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { term: "חורים שחורים", icon: "🌌" },
              { term: "זיכרון", icon: "🧠" },
              { term: "צמחים", icon: "🌱" },
              { term: "המצאות", icon: "🏛️" },
              { term: "צבעים", icon: "🎨" },
              { term: "בינה מלאכותית", icon: "🤖" },
              { term: "אקלים", icon: "🌍" },
              { term: "פיזיקה", icon: "🔬" }
            ].map((suggestion) => (
              <Button
                key={suggestion.term}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center"
                onClick={() => {
                  setSearchQuery(suggestion.term);
                  setActiveQuery(suggestion.term);
                  window.history.pushState({}, '', `/search?q=${encodeURIComponent(suggestion.term)}`);
                }}
              >
                <span className="text-2xl mb-2">{suggestion.icon}</span>
                <span className="text-sm">{suggestion.term}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}