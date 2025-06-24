import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopicCard from "@/components/topic-card";
import CategoryCard from "@/components/category-card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Topic } from "@shared/schema";

export default function Topics() {
  const { category, ageGroup } = useParams<{ category?: string; ageGroup?: string }>();
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState(category ? "category" : ageGroup ? "age" : "all");

  const { data: allTopics, isLoading } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
  });

  const { data: categoryTopics } = useQuery<Topic[]>({
    queryKey: [`/api/topics/category/${category}`],
    enabled: !!category,
  });

  const { data: ageTopics } = useQuery<Topic[]>({
    queryKey: [`/api/topics/age/${ageGroup}`],
    enabled: !!ageGroup && ageGroup !== "all",
  });

  const getTopicsToShow = () => {
    if (category && categoryTopics) return categoryTopics;
    if (ageGroup && ageGroup !== "all" && ageTopics) return ageTopics;
    return allTopics;
  };

  const getCategoryCount = (cat: string) => {
    return allTopics?.filter(topic => topic.category === cat).length || 0;
  };

  const getAgeGroupTopics = (age: string) => {
    if (!allTopics) return [];
    
    switch (age) {
      case "3-7":
        return allTopics.filter(topic => 
          topic.ageGroup.includes("3-7") || topic.ageGroup.includes("6+")
        );
      case "8-14":
        return allTopics.filter(topic => 
          topic.ageGroup.includes("8-14") || topic.ageGroup.includes("8+") ||
          topic.ageGroup.includes("10+") || topic.ageGroup.includes("11+") ||
          topic.ageGroup.includes("12+")
        );
      case "15+":
        return allTopics.filter(topic => 
          topic.ageGroup.includes("15+") || topic.ageGroup.includes("14+") ||
          topic.ageGroup.includes("12-18")
        );
      default:
        return allTopics;
    }
  };

  const getPageTitle = () => {
    if (category) {
      const categoryNames: Record<string, string> = {
        science: "מדעים",
        history: "היסטוריה",
        arts: "אמנות ותרבות",
        technology: "טכנולוגיה"
      };
      return `נושאים בתחום ${categoryNames[category] || category}`;
    }
    if (ageGroup && ageGroup !== "all") {
      return `נושאים לגילאי ${ageGroup}`;
    }
    return "כל הנושאים";
  };

  const topics = getTopicsToShow();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-24 mb-6" />
        <Skeleton className="h-12 w-1/2 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
          {getPageTitle()}
        </h1>
        <p className="text-gray-600">
          {topics?.length || 0} נושאים זמינים
        </p>
      </div>

      {/* Tabs for filtering */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">כל הנושאים</TabsTrigger>
          <TabsTrigger value="category">לפי תחום</TabsTrigger>
          <TabsTrigger value="age">לפי גיל</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {topics && topics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-600">אין נושאים זמינים כרגע</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="category" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="מדעים"
              description="פיזיקה, כימיה, ביולוגיה ועוד"
              icon="🔬"
              count={getCategoryCount("science")}
              href="/topics/category/science"
              gradient="bg-gradient-to-br from-blue-50 to-blue-100"
            />
            <CategoryCard
              title="היסטוריה"
              description="סיפורי העבר והווה"
              icon="🏛️"
              count={getCategoryCount("history")}
              href="/topics/category/history"
              gradient="bg-gradient-to-br from-yellow-50 to-yellow-100"
            />
            <CategoryCard
              title="אמנות ותרבות"
              description="יצירה, מוזיקה וספרות"
              icon="🎨"
              count={getCategoryCount("arts")}
              href="/topics/category/arts"
              gradient="bg-gradient-to-br from-purple-50 to-purple-100"
            />
            <CategoryCard
              title="טכנולוגיה"
              description="חדשנות ועתיד"
              icon="💻"
              count={getCategoryCount("technology")}
              href="/topics/category/technology"
              gradient="bg-gradient-to-br from-green-50 to-green-100"
            />
          </div>
        </TabsContent>

        <TabsContent value="age" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { range: "3-7", title: "גילאי 3-7", icon: "🧒", desc: "סיפורים וחידות פשוטות" },
              { range: "8-14", title: "גילאי 8-14", icon: "🎓", desc: "תוכן לגיל בית הספר" },
              { range: "15+", title: "גיל 15+", icon: "🎯", desc: "נושאים מתקדמים" },
            ].map((ageFilter) => (
              <Link key={ageFilter.range} href={`/topics/age/${ageFilter.range}`}>
                <Card className="card-hover cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <span className="text-3xl mb-3 block">{ageFilter.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900 font-alef mb-2">
                      {ageFilter.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{ageFilter.desc}</p>
                    <span className="text-sm text-primary font-medium">
                      {getAgeGroupTopics(ageFilter.range).length} נושאים
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Show age-filtered topics if specific age is selected */}
          {ageGroup && ageGroup !== "all" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getAgeGroupTopics(ageGroup).map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Show category-specific topics */}
      {category && categoryTopics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}
