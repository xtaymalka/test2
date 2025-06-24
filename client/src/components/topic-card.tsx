import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCategoryColor, getAgeGroupLabel } from "@/lib/utils";
import type { Topic } from "@shared/schema";

interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const getBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      popular: "bg-yellow-100 text-yellow-800",
      new: "bg-green-100 text-green-800",
      recommended: "bg-blue-100 text-blue-800",
      creative: "bg-purple-100 text-purple-800",
      trending: "bg-red-100 text-red-800",
      current: "bg-green-100 text-green-800"
    };
    return colors[type] || colors.popular;
  };

  const getBadgeText = () => {
    if (topic.isPopular) return "פופולרי";
    if (topic.isDaily) return "נושא היום";
    return "מומלץ";
  };

  return (
    <Link href={`/topic/${topic.id}`} className="block">
      <Card className="h-full card-hover cursor-pointer border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <span className="text-2xl">{topic.icon}</span>
            <Badge className={getBadgeColor("popular")}>
              {getBadgeText()}
            </Badge>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-alef line-clamp-2">
            {topic.title}
          </h3>
          
          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
            {topic.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant="secondary" className={getCategoryColor(topic.category)}>
                {topic.categoryHe}
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                {getAgeGroupLabel(topic.ageGroup)}
              </Badge>
            </div>
            <span className="text-sm text-gray-500">
              {topic.readingTime} דק׳
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
