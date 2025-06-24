import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const months = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  
  const dayName = days[d.getDay()];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  
  return `יום ${dayName}, ${day} ב${month} ${year}`;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    science: 'bg-blue-100 text-blue-800',
    history: 'bg-yellow-100 text-yellow-800',
    arts: 'bg-purple-100 text-purple-800',
    technology: 'bg-green-100 text-green-800',
    default: 'bg-gray-100 text-gray-800'
  };
  
  return colors[category] || colors.default;
}

export function getAgeGroupLabel(ageGroup: string): string {
  const labels: Record<string, string> = {
    '3-7': 'גילאי 3-7',
    '8-14': 'גילאי 8-14',
    '10+': 'גיל 10+',
    '11+': 'גיל 11+',
    '12+': 'גיל 12+',
    '12-18': 'גילאי 12-18',
    '14+': 'גיל 14+',
    '15+': 'גיל 15+'
  };
  
  return labels[ageGroup] || ageGroup;
}
