import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  count: number;
  href: string;
  gradient: string;
}

export default function CategoryCard({ 
  title, 
  description, 
  icon, 
  count, 
  href, 
  gradient 
}: CategoryCardProps) {
  return (
    <Link href={href} className="block">
      <Card className={`${gradient} card-hover cursor-pointer border-none`}>
        <CardContent className="p-6 text-center">
          <span className="text-4xl mb-4 block">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-alef">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {description}
          </p>
          <span className="text-xs text-gray-700 font-medium">
            {count} נושאים
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
