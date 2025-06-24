import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TopicCard from "@/components/topic-card";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import type { Topic } from "@shared/schema";

export default function Archive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");

  const { data: allTopics, isLoading } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
  });

  const filteredTopics = allTopics?.filter(topic => {
    const matchesSearch = !searchQuery || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === "all" || topic.category === categoryFilter;
    
    const matchesAge = ageFilter === "all" || 
      (ageFilter === "3-7" && (topic.ageGroup.includes("3-7") || topic.ageGroup.includes("6+"))) ||
      (ageFilter === "8-14" && (topic.ageGroup.includes("8-14") || topic.ageGroup.includes("8+") || topic.ageGroup.includes("10+") || topic.ageGroup.includes("11+") || topic.ageGroup.includes("12+"))) ||
      (ageFilter === "15+" && (topic.ageGroup.includes("15+") || topic.ageGroup.includes("14+") || topic.ageGroup.includes("12-18")));

    return matchesSearch && matchesCategory && matchesAge;
  });

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setAgeFilter("all");
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-24 mb-6" />
        <Skeleton className="h-12 w-1/2 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

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
          ארכיון הנושאים
        </h1>
        <p className="text-gray-600">
          חפשו וגלו את כל הנושאים שפורסמו עד כה
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="חפשו נושאים, תגיות או תוכן..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-4 pl-10 text-right"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="כל התחומים" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל התחומים</SelectItem>
                  <SelectItem value="science">מדעים</SelectItem>
                  <SelectItem value="history">היסטוריה</SelectItem>
                  <SelectItem value="arts">אמנות ותרבות</SelectItem>
                  <SelectItem value="technology">טכנולוגיה</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Age Filter */}
            <div className="md:w-48">
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="כל הגילאים" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הגילאים</SelectItem>
                  <SelectItem value="3-7">גילאי 3-7</SelectItem>
                  <SelectItem value="8-14">גילאי 8-14</SelectItem>
                  <SelectItem value="15+">גיל 15+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            <Button variant="outline" onClick={handleClearFilters}>
              נקה הכל
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredTopics?.length || 0} נושאים נמצאו
        </p>
      </div>

      {/* Topics Grid */}
      {filteredTopics && filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-alef">
              לא נמצאו נושאים
            </h3>
            <p className="text-gray-600 mb-6">
              לא מצאנו נושאים שמתאימים לחיפוש או לפילטרים שלכם
            </p>
            <Button onClick={handleClearFilters}>
              נקה פילטרים
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
