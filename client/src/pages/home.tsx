import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TopicCard from "@/components/topic-card";
import CategoryCard from "@/components/category-card";
import AgeFilter from "@/components/age-filter";
import { formatDate } from "@/lib/utils";
import type { Topic } from "@shared/schema";

export default function Home() {
  const { data: dailyTopic, isLoading: isDailyLoading } = useQuery<Topic>({
    queryKey: ["/api/topics/daily"],
  });

  const { data: popularTopics, isLoading: isPopularLoading } = useQuery<Topic[]>({
    queryKey: ["/api/topics/popular"],
  });

  const { data: allTopics } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
  });

  const getCategoryCount = (category: string) => {
    return allTopics?.filter(topic => topic.category === category).length || 0;
  };

  const getAgeGroupCount = (ageGroup: string) => {
    if (ageGroup === "3-7") {
      return allTopics?.filter(topic => topic.ageGroup.includes("3-7") || topic.ageGroup.includes("6+")).length || 0;
    }
    if (ageGroup === "8-14") {
      return allTopics?.filter(topic => 
        topic.ageGroup.includes("8-14") || topic.ageGroup.includes("8+") ||
        topic.ageGroup.includes("10+") || topic.ageGroup.includes("11+") ||
        topic.ageGroup.includes("12+")
      ).length || 0;
    }
    if (ageGroup === "15+") {
      return allTopics?.filter(topic => 
        topic.ageGroup.includes("15+") || topic.ageGroup.includes("14+") ||
        topic.ageGroup.includes("12-18")
      ).length || 0;
    }
    return 0;
  };

  if (isDailyLoading) {
    return (
      <div className="gradient-bg py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-48 mx-auto mb-2" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          <Skeleton className="h-96 max-w-4xl mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section - Daily Featured Topic */}
      <section className="gradient-bg py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 font-alef mb-2">נושא היום</h2>
            <p className="text-xl text-gray-600">{formatDate(new Date())}</p>
            <span className="text-2xl">📅</span>
          </div>

          {dailyTopic ? (
            <Card className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 max-w-4xl mx-auto">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-2/3">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl ml-3">{dailyTopic.icon}</span>
                      <h3 className="text-3xl font-bold text-gray-900 font-alef">
                        {dailyTopic.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {dailyTopic.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {dailyTopic.categoryHe}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        גילאי {dailyTopic.ageGroup}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        זמן קריאה: {dailyTopic.readingTime} דקות
                      </span>
                    </div>
                    <Link href={`/topic/${dailyTopic.id}`}>
                      <Button size="lg" className="bg-primary text-white hover:bg-blue-600">
                        קרא עוד 📖
                      </Button>
                    </Link>
                  </div>
                  <div className="lg:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                      alt={dailyTopic.title}
                      className="rounded-xl shadow-lg w-full h-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 max-w-4xl mx-auto">
              <CardContent className="text-center">
                <p className="text-gray-600">אין נושא יומי זמין כרגע</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-alef">נושאים פופולריים השבוע</h2>
            <Link href="/topics">
              <Button variant="outline">צפה בכל הנושאים</Button>
            </Link>
          </div>

          {isPopularLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTopics?.slice(0, 6).map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 font-alef">עיון מהיר</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard
              title="לפי נושא"
              description="גלו נושאים לפי תחומי עניין - מדעים, אמנות, היסטוריה ועוד"
              icon="📚"
              count={allTopics?.length || 0}
              href="/topics"
              gradient="bg-gradient-to-br from-blue-50 to-blue-100"
            />
            <CategoryCard
              title="לפי גיל"
              description="תוכן מותאם לכל גיל - מילדי הגן ועד בוגרים"
              icon="👶"
              count={allTopics?.length || 0}
              href="/topics/age/all"
              gradient="bg-gradient-to-br from-green-50 to-green-100"
            />
            <CategoryCard
              title="ארכיון"
              description="צפו בכל הנושאים שפורסמו בעבר ולמדו בקצב שלכם"
              icon="🗂️"
              count={allTopics?.length || 0}
              href="/archive"
              gradient="bg-gradient-to-br from-purple-50 to-purple-100"
            />
          </div>
        </div>
      </section>

      {/* Topics by Category */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 font-alef">
            חקרו לפי תחומי עניין
          </h2>
          
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
        </div>
      </section>

      {/* Age-Based Learning */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-alef mb-2">
              למידה מותאמת גיל
            </h2>
            <p className="text-gray-600">
              תוכן חינוכי שמתאים בדיוק לשלב ההתפתחות של הלומד
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AgeFilter
              ageRange="3-7"
              title="גילאי 3-7"
              description="סיפורים, חידות פשוטות ותגליות ראשונות בעולם"
              icon="🧒"
              count={getAgeGroupCount("3-7")}
            />
            <AgeFilter
              ageRange="8-14"
              title="גילאי 8-14"
              description="מדע, היסטוריה וטכנולוגיה ברמה המתאימה לגיל בית הספר"
              icon="🎓"
              count={getAgeGroupCount("8-14")}
            />
            <AgeFilter
              ageRange="15+"
              title="גיל 15+"
              description="נושאים מתקדמים, מחקר עמוק וחשיבה ביקורתית"
              icon="🎯"
              count={getAgeGroupCount("15+")}
            />
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-4xl mb-4 block">📧</span>
          <h2 className="text-2xl font-bold mb-2 font-alef">הישארו מעודכנים</h2>
          <p className="text-gray-300 mb-6">קבלו כל יום נושא חדש ומעניין ישירות למייל</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="הכניסו את כתובת המייל שלכם"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-right"
            />
            <Button type="submit" className="bg-primary hover:bg-blue-600">
              הירשמו
            </Button>
          </form>
          
          <p className="text-xs text-gray-400 mt-4">
            ניתן לבטל את המנוי בכל עת. אנו מכבדים את הפרטיות שלכם.
          </p>
        </div>
      </section>
    </div>
  );
}
