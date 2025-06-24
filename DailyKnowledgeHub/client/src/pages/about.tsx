import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Heart, BookOpen, Users, Target, Lightbulb } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/" className="text-primary hover:text-blue-600 inline-flex items-center">
          <ArrowRight className="w-4 h-4 ml-1" />
          בית
        </Link>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-6xl mb-4 block">🧠</span>
        <h1 className="text-4xl font-bold text-gray-900 font-alef mb-4">
          אודות ידע ליום
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          פלטפורמה חינוכית המקדמת למידה יומיומית עם תוכן איכותי ומעניין לכל הגילאים
        </p>
      </div>

      {/* Mission */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 ml-3 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900 font-alef">המשימה שלנו</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            אנחנו מאמינים שלמידה צריכה להיות נגישה, מעניינת ומותאמת לכל אדם. המטרה שלנו היא להציג כל יום 
            נושא חדש ומרתק שיעורר סקרנות, יעשיר את הידע וייתן כלים חדשים להבנת העולם סביבנו. 
            כל תוכן נכתב בקפידה, מותאם לגילאים השונים ומוצג בצורה ברורה ומעניינת.
          </p>
        </CardContent>
      </Card>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              <BookOpen className="w-5 h-5 ml-2 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 font-alef">איכות תוכן</h3>
            </div>
            <p className="text-gray-600 text-sm">
              כל נושא נכתב ונבדק בקפידה על ידי מומחים בתחום, עם דגש על דיוק מדעי ובהירות הסבר
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              <Users className="w-5 h-5 ml-2 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 font-alef">נגישות לכולם</h3>
            </div>
            <p className="text-gray-600 text-sm">
              תוכן מותאם לגילאים שונים, ממילדי הגן ועד למבוגרים, עם התאמה לרמות הבנה שונות
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-5 h-5 ml-2 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 font-alef">עידוד סקרנות</h3>
            </div>
            <p className="text-gray-600 text-sm">
              אנחנו מאמינים שסקרנות היא המפתח ללמידה. כל נושא מועבר בצורה שמעוררת עניין ורצון ללמוד עוד
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              <Heart className="w-5 h-5 ml-2 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 font-alef">אהבת למידה</h3>
            </div>
            <p className="text-gray-600 text-sm">
              המטרה שלנו היא לטפח אהבה ללמידה ולהראות שידע יכול להיות מרתק ומהנה
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Topics Coverage */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 font-alef mb-6 text-center">
            התחומים שלנו
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <span className="text-3xl mb-2 block">🔬</span>
              <h3 className="font-semibold text-gray-900 mb-1">מדעים</h3>
              <p className="text-xs text-gray-600">פיזיקה, כימיה, ביולוגיה ועוד</p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">🏛️</span>
              <h3 className="font-semibold text-gray-900 mb-1">היסטוריה</h3>
              <p className="text-xs text-gray-600">סיפורי העבר והווה</p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">🎨</span>
              <h3 className="font-semibold text-gray-900 mb-1">אמנות ותרבות</h3>
              <p className="text-xs text-gray-600">יצירה, מוזיקה וספרות</p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">💻</span>
              <h3 className="font-semibold text-gray-900 mb-1">טכנולוגיה</h3>
              <p className="text-xs text-gray-600">חדשנות ועתיד</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="mb-8">
        <CardContent className="p-8 text-center">
          <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold text-gray-900 font-alef mb-4">
            יש לכם הצעות או שאלות?
          </h2>
          <p className="text-gray-600 mb-6">
            אנחנו תמיד שמחים לשמוע מכם! שלחו לנו הצעות לנושאים, משוב או כל שאלה אחרת.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-blue-600">
              📧 שלחו לנו מייל
            </Button>
            <Button variant="outline">
              💬 פתחו צ'אט
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center">
        <p className="text-gray-500 text-sm mb-4">
          נבנה בישראל 🇮🇱 עם ❤️ לחינוך
        </p>
        <Link href="/">
          <Button>חזרה לעמוד הבית</Button>
        </Link>
      </div>
    </div>
  );
}