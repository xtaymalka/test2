import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl ml-2">🧠</span>
              <h3 className="text-xl font-bold text-gray-900 font-alef">ידע ליום</h3>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              פלטפורמה חינוכית המקדמת למידה יומיומית עם תוכן איכותי ומעניין לכל הגילאים.
              כל יום נושא חדש, כל יום הזדמנות ללמוד משהו חדש.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">📘</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">📧</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">📺</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 font-alef">קישורים מהירים</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
                  בית
                </Link>
              </li>
              <li>
                <Link href="/topics" className="text-gray-600 hover:text-primary transition-colors">
                  לפי נושא
                </Link>
              </li>
              <li>
                <Link href="/topics/age/all" className="text-gray-600 hover:text-primary transition-colors">
                  לפי גיל
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-gray-600 hover:text-primary transition-colors">
                  ארכיון
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  עלינו
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 font-alef">תמיכה</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  מרכז עזרה
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  צור קשר
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  דווח על בעיה
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  פרטיות
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  תנאי שימוש
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 ידע ליום. כל הזכויות שמורות.
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              נבנה בישראל 🇮🇱 עם ❤️ לחינוך
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
