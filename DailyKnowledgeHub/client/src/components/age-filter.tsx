import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

interface AgeFilterProps {
  ageRange: string;
  title: string;
  description: string;
  icon: string;
  count: number;
}

export default function AgeFilter({ 
  ageRange, 
  title, 
  description, 
  icon, 
  count 
}: AgeFilterProps) {
  return (
    <Link href={`/topics/age/${ageRange}`} className="block">
      <Card className="bg-white card-hover cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <span className="text-3xl ml-3">{icon}</span>
            <h3 className="text-lg font-semibold text-gray-900 font-alef">
              {title}
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-primary font-medium">
              {count} נושאים מתאימים
            </span>
            <span className="text-xl">🌟</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
