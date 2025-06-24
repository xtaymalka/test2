import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Clock, User, Calendar } from "lucide-react";
import { Link } from "wouter";
import { getCategoryColor, getAgeGroupLabel, formatDate } from "@/lib/utils";
import type { Topic } from "@shared/schema";

export default function TopicPage() {
  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id || "0");

  const { data: topic, isLoading, error } = useQuery<Topic>({
    queryKey: [`/api/topics/${topicId}`],
    enabled: !isNaN(topicId) && topicId > 0,
  });

  const { data: relatedTopics } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
    select: (data) => data
      ?.filter(t => t.id !== topicId && t.category === topic?.category)
      .slice(0, 3),
    enabled: !!topic,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-24 mb-6" />
        <div className="mb-8">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">הנושא לא נמצא</h1>
            <p className="text-gray-600 mb-6">המאמר שחיפשתם אינו קיים או הוסר</p>
            <Link href="/">
              <Button>חזרה לעמוד הבית</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/" className="text-primary hover:text-blue-600 inline-flex items-center">
          <ArrowRight className="w-4 h-4 ml-1" />
          בית
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-4xl ml-4">{topic.icon}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-alef">
            {topic.title}
          </h1>
        </div>

        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {topic.excerpt}
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          <Badge className={getCategoryColor(topic.category)}>
            {topic.categoryHe}
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            {getAgeGroupLabel(topic.ageGroup)}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 ml-1" />
            זמן קריאה: {topic.readingTime} דקות
          </div>
          {topic.createdAt && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 ml-1" />
              {formatDate(topic.createdAt)}
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <div className="prose prose-lg max-w-none">
            {topic.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      {topic.tags && topic.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 font-alef">תגיות</h3>
          <div className="flex flex-wrap gap-2">
            {topic.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Related Topics */}
      {relatedTopics && relatedTopics.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 font-alef">
            נושאים קשורים
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedTopics.map((relatedTopic) => (
              <Link key={relatedTopic.id} href={`/topic/${relatedTopic.id}`}>
                <Card className="card-hover cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start mb-2">
                      <span className="text-xl ml-2">{relatedTopic.icon}</span>
                      <h4 className="font-semibold text-gray-900 text-sm font-alef line-clamp-2">
                        {relatedTopic.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {relatedTopic.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Link href="/topics">
          <Button variant="outline">
            <ArrowRight className="w-4 h-4 ml-1" />
            כל הנושאים
          </Button>
        </Link>
        <Link href="/">
          <Button>
            חזרה לעמוד הבית
          </Button>
        </Link>
      </div>
    </div>
  );
}
