import { users, topics, type User, type InsertUser, type Topic, type InsertTopic } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Topic methods
  getTopic(id: number): Promise<Topic | undefined>;
  getAllTopics(): Promise<Topic[]>;
  getTopicsByCategory(category: string): Promise<Topic[]>;
  getTopicsByAgeGroup(ageGroup: string): Promise<Topic[]>;
  getPopularTopics(): Promise<Topic[]>;
  getDailyTopic(date?: Date): Promise<Topic | undefined>;
  searchTopics(query: string): Promise<Topic[]>;
  createTopic(topic: InsertTopic): Promise<Topic>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private topics: Map<number, Topic>;
  private currentUserId: number;
  private currentTopicId: number;

  constructor() {
    this.users = new Map();
    this.topics = new Map();
    this.currentUserId = 1;
    this.currentTopicId = 1;
    this.initializeTopics();
  }

  private initializeTopics() {
    // Initialize with sample educational topics
    const sampleTopics: InsertTopic[] = [
      {
        title: "החורים השחורים: תעלומות היקום",
        titleEn: "Black Holes: Mysteries of the Universe",
        excerpt: "גלו את אחת התופעות המסתוריות ביותר ביקום - החורים השחורים. איך הם נוצרים, מה קורה בפנים שלהם, ומה המדענים גילו לאחרונה על הענקים הקוסמיים האלה.",
        content: "החורים השחורים הם אחת התופעות המרתקות והמסתוריות ביותר ביקום שלנו. הם נוצרים כאשר כוכב ענק מסיים את חייו בפיצוץ עצום הנקרא סופרנובה. אם המסה של הכוכב גדולה מספיק, הכבידה שלו הופכת לחזקה כל כך שהיא מכווצת את החומר לנקודה אינסופית צפיפה הנקראת סינגולריות.\n\nמה שהופך חורים שחורים למיוחדים הוא שהכבידה שלהם חזקה כל כך שאפילו אור לא יכול לברוח מהם. זה מה שהופך אותם ל'שחורים' - אנחנו לא יכולים לראות אותם ישירות.\n\nהמדענים גילו שלחורים שחורים יש גבול הנקרא 'אופק אירועים' - זה הגבול שמעבר לו שום דבר לא יכול לחזור. אם אתם נופלים לתוך חור שחור, מנקודת המבט של מישהו שצופה מרחוק, אתם תיראו קופאים בזמן ונעלמים לאט.\n\nאחד הדברים המדהימים ביותר שגילו המדענים הוא שחורים שחורים משפיעים על הזמן. ככל שאתם מתקרבים לחור שחור, הזמן עובר לכם יותר לאט ביחס למישהו שנמצא רחוק יותר. זה נקרא 'התפשטות זמן כבידתית'.\n\nבשנת 2019, מדענים הצליחו לצלם בפעם הראשונה תמונה של חור שחור - החור השחור הענק במרכז הגלקסיה M87. התמונה הראתה טבעת זוהרת של חומר חם המסתובב סביב הצל הכהה של החור השחור.\n\nחורים שחורים הם לא רק אובייקטים מעניינים מבחינה מדעית - הם גם מלמדים אותנו על חוקי הפיזיקה הבסיסיים של היקום, על הזמן, המרחב והכבידה.",
        category: "science",
        categoryHe: "מדעים",
        ageGroup: "12-18",
        readingTime: 8,
        icon: "🌌",
        tags: ["פיזיקה", "אסטרונומיה", "חלל"],
        isDaily: true,
        dailyDate: new Date(),
        isPopular: true
      },
      {
        title: "כיצד פועל הזיכרון האנושי?",
        titleEn: "How Does Human Memory Work?",
        excerpt: "מסע מרתק אל תוך המוח האנושי - איך אנחנו זוכרים, שוכחים ויוצרים זיכרונות חדשים.",
        content: "הזיכרון האנושי הוא אחד הדברים המרתקים ביותר במוח שלנו. הוא מאפשר לנו ללמוד, להתפתח ולהבין את העולם סביבנו.\n\nיש שלושה סוגים עיקריים של זיכרון:\n\n1. זיכרון חושי - זה הזיכרון שנמשך רק כמה שניות ומכיל מידע מהחושים שלנו\n2. זיכרון לטווח קצר - יכול להחזיק מידע לכמה דקות ומוגבל לכ-7 פריטים\n3. זיכרון לטווח ארוך - יכול להחזיק מידע לחיים ולא מוגבל בכמות\n\nהמוח שלנו עובד כמו ספרייה ענקית - הוא מאחסן מידע, מארגן אותו ומאחזר אותו כשאנחנו צריכים.\n\nמה שמעניין הוא שהזיכרון שלנו לא מושלם - הוא יכול להשתנות כל פעם שאנחנו נזכרים במשהו. לכן לפעמים אנחנו זוכרים דברים שלא קרו בדיוק כמו שאנחנו חושבים.\n\nכדי לשפר את הזיכרון שלנו, אנחנו יכולים:\n- ללמוד דברים חדשים בקביעות\n- לישון מספיק (השינה עוזרת לקבע זיכרונות)\n- לחזור על מידע שאנחנו רוצים לזכור\n- לקשר מידע חדש לדברים שאנחנו כבר יודעים",
        category: "science",
        categoryHe: "מדעים",
        ageGroup: "10+",
        readingTime: 5,
        icon: "🧠",
        tags: ["פסיכולוגיה", "נוירולוגיה", "למידה"],
        isPopular: true
      },
      {
        title: "איך צמחים 'מתקשרים' ביניהם?",
        titleEn: "How Do Plants 'Communicate' With Each Other?",
        excerpt: "גלו את רשת התקשורת המדהימה שקיימת בין עצים ביער ואיך הם עוזרים זה לזה.",
        content: "האם ידעתם שצמחים יכולים לתקשר זה עם זה? זה נשמע כמו מדע בדיוני, אבל זה באמת קורה!\n\nצמחים מתקשרים בכמה דרכים:\n\n1. דרך השורשים - יש רשת מיוחדת של פטריות שנקראת 'רשת המיקוריזה' שמחברת בין שורשי עצים שונים. דרך הרשת הזאת, עצים יכולים לשלוח זה לזה מזון, מים ואפילו אזהרות על מחלות או מזיקים.\n\n2. דרך הרוח - כשצמח מותקף על ידי חרקים, הוא יכול לשלח כימיקלים באוויר שמזהירים צמחים אחרים. הצמחים שמקבלים את האזהרה מתחילים לייצר חומרים שיגנו עליהם.\n\n3. דרך העלים - כמה צמחים יכולים להרגיש כשצמח שכן נגע בהם ולהגיב בהתאם.\n\nהדוגמה הכי מפורסמת היא ה'אם העץ' - עץ ותיק גדול ביער שמחובר לעצים רבים אחרים ומשתף איתם משאבים. כמו אמא שדואגת לילדים שלה!\n\nמחקרים הראו שעצים יכולים אפילו לזהות את ה'ילדים' שלהם (העצים הצעירים שצמחו מהזרעים שלהם) ולתת להם יותר משאבים.\n\nהתקשורת בין צמחים מלמדת אותנו שהטבע הוא מקום מחובר יותר ממה שחשבנו. כל צמח הוא חלק מקהילה גדולה שעוזרת זה לזה לשרוד.",
        category: "science",
        categoryHe: "מדעים",
        ageGroup: "8+",
        readingTime: 7,
        icon: "🌱",
        tags: ["ביולוגיה", "טבע", "צמחים"],
        isPopular: true
      },
      {
        title: "המצאות שפכו דמים",
        titleEn: "Life-Changing Inventions",
        excerpt: "סיפורים מרתקים על המצאות פשוטות שהפכו את חיינו - מהגלגל ועד לאינטרנט.",
        content: "לאורך ההיסטוריה, המצאות קטנות שינו את חיי האנושות לחלוטין. הנה כמה מהמצאות המהפכניות ביותר:\n\n1. הגלגל (3500 לפנה\"ס) - המצאה פשוטה שחוללה מהפכה בתחבורה ובבנייה. בלי הגלגל, לא היינו יכולים לבנות מכוניות, רכבות או אפילו מכונות מורכבות.\n\n2. הכתב (3200 לפנה\"ס) - איפשר לבני אדם לשמר ידע ולהעביר אותו לדורות הבאים. בלי כתב, כל הידע היה אבוד עם מות האדם.\n\n3. הדפוס (1440) - יוהנס גוטנברג המציא את מכונת הדפוס, שאיפשרה לייצר ספרים בכמויות גדולות. זה הפך ידע לנגיש לכולם, לא רק לעשירים.\n\n4. הנורה (1879) - תומס אדיסון פיתח את הנורה החשמלית, שאיפשרה לאנשים לעבוד ולפעול גם בלילה.\n\n5. הטלפון (1876) - אלכסנדר גרהם בל המציא את הטלפון, שאיפשר לאנשים לדבר זה עם זה ממרחק.\n\n6. המחשב (1940-1950) - מחשבים ראשונים היו ענקיים ומילאו חדרים שלמים. היום יש לנו מחשבים בכיס!\n\n7. האינטרנט (1969-1990) - התיאור מרשת צבאית קטנה לרשת עולמית ששינתה איך אנחנו מתקשרים, לומדים ועובדים.\n\nכל אחת מההמצאות האלה התחילה מרעיון פשוט של אדם שרצה לפתור בעיה. זה מראה שכל אחד מאיתנו יכול לחשוב על דרכים לשפר את העולם!",
        category: "history",
        categoryHe: "היסטוריה",
        ageGroup: "12+",
        readingTime: 10,
        icon: "🏛️",
        tags: ["המצאות", "טכנולוגיה", "היסטוריה"],
        isPopular: true
      },
      {
        title: "סודות הצבעים בטבע",
        titleEn: "Secrets of Colors in Nature",
        excerpt: "למה פרפרים כל כך צבעוניים? איך נוצרים הצבעים בטבע ומה הם מספרים לנו?",
        content: "הטבע מלא בצבעים מדהימים - מכנפי הפרפר הכחולות ועד לפרחים האדומים. אבל איך נוצרים הצבעים האלה?\n\nיש שתי דרכים עיקריות ליצירת צבעים בטבע:\n\n1. פיגמנטים - אלה חומרים שבולעים אור בצבעים מסוימים ומחזירים אחרים. לדוגמה, הכלורופיל בעלים בולע אור אדום וכחול ומחזיר ירוק.\n\n2. צבעים מבניים - אלה נוצרים מהדרך שבה האור מתנהג כשהוא פוגש במבנים זעירים. הצבע הכחול הזוהר של כמה פרפרים נוצר כך.\n\nלמה חיות צבעוניות?\n\n- הסוואה: כמה חיות משתמשות בצבעים כדי להתחבא מטורפים או מטרף\n- משיכת בני זוג: ציפורים וחרקים רבים משתמשים בצבעים בהירים כדי למשוך בני זוג\n- אזהרה: צבעים בהירים לעיתים מזהירים שהחיה מסוכנת או רעילה\n\nדוגמאות מעניינות:\n\n- זיקית מזדמנת יכולה לשנות צבע תוך שניות\n- פרפר מורפו כחול נראה כחול רק מזווית מסוימת\n- פלמינגו נולדים אפורים ונהיים ורודים בגלל המזון שהם אוכלים\n- הצבע הירוק של העלים נוצר מהכלורופיל שעוזר לצמח לבצע פוטוסינתזה\n\nהצבעים בטבע הם לא רק יפים - הם גם מספרים סיפורים על איך חיים מתפתחים ומתאימים לסביבה שלהם.",
        category: "arts",
        categoryHe: "טבע ואמנות",
        ageGroup: "6+",
        readingTime: 6,
        icon: "🎨",
        tags: ["צבעים", "טבע", "אמנות"],
        isPopular: true
      },
      {
        title: "בינה מלאכותית בחיי היומיום",
        titleEn: "AI in Everyday Life",
        excerpt: "איך בינה מלאכותית כבר משפיעה על חיינו בלי שנשים לב - ומה צפוי לנו בעתיד.",
        content: "בינה מלאכותית (AI) נשמעת כמו דבר מהעתיד, אבל היא כבר חלק מהחיים שלנו!\n\nאיפה אנחנו פוגשים AI היום?\n\n1. בטלפון שלנו:\n- סירי, גוגל אסיסטנט ואלקסה מבינים מה אנחנו אומרים\n- המצלמה מזהה פרצופים ומציעה תגים\n- האפליקציות למידה מהרגלים שלנו\n\n2. באינטרנט:\n- גוגל משתמש ב-AI כדי להביא לנו תוצאות חיפוש מדויקות\n- נטפליקס ויוטיוב ממליצים על סרטים וסרטונים\n- פייסבוק מזהה אותנו בתמונות\n\n3. בבית:\n- טלוויזיות חכמות לומדות מה אנחנו אוהבים לראות\n- מכשירי חשמל חכמים חוסכים אנרגיה\n- מערכות אבטחה מזהות פעילות חשודה\n\n4. ברכב:\n- מערכות ניווט מתכננות את הדרך הכי טובה\n- מכוניות מזהירות אותנו מפני סכנות\n- חניה אוטומטית עוזרת לנו לחנות\n\nאיך AI לומדת?\nAI לומדת מכמויות ענקיות של מידע. כמו שילד לומד לזהות כלב אחרי שראה הרבה כלבים, כך מחשב לומד לזהות דברים אחרי שראה מיליוני דוגמאות.\n\nמה צפוי בעתיד?\n- רופאים ישתמשו ב-AI כדי לגלות מחלות מוקדם יותר\n- מורים יקבלו עזרה ב-AI ללמד כל תלמיד באופן אישי\n- מכוניות יסעו לבד ללא נהג\n- AI תעזור לנו לפתור בעיות גדולות כמו זיהום אוויר\n\nה-AI כבר כאן, והיא כאן כדי לעזור לנו!",
        category: "technology",
        categoryHe: "טכנולוגיה",
        ageGroup: "14+",
        readingTime: 12,
        icon: "🤖",
        tags: ["AI", "טכנולוגיה", "עתיד"],
        isPopular: true
      },
      {
        title: "שינויי אקלים: מה באמת קורה?",
        titleEn: "Climate Change: What's Really Happening?",
        excerpt: "הסבר מדעי ברור על שינויי האקלים, הסיבות וההשפעות על כדור הארץ שלנו.",
        content: "שינויי אקלים הם אחד הנושאים החשובים ביותר בזמננו. אבל מה בדיוק קורה?\n\nמה זה שינויי אקלים?\nשינויי אקלים זה שינוי בדפוסי מזג האוויר לאורך זמן. כדור הארץ תמיד חווה שינויים טבעיים באקלים, אבל בעשרות השנים האחרונות השינויים מהירים יותר מהרגיל.\n\nלמה זה קורה?\nהסיבה העיקרית היא 'אפקט החממה':\n1. השמש שולחת חום לכדור הארץ\n2. חלק מהחום חוזר לחלל\n3. גזי חממה באטמוספירה (כמו פחמן דו-חמצני) 'תופסים' חלק מהחום\n4. זה שומר על כדור הארץ חם - דבר טוב!\n5. אבל יותר מדי גזי חממה = יותר מדי חום\n\nמה הסיבות לעלייה בגזי חממה?\n- שריפת דלקים מאובנים (פחם, נפט, גז)\n- כריתת יערות\n- חקלאות מסוימת\n- תעשיות שונות\n\nמה ההשפעות?\n- טמפרטורות עולות\n- קרחונים נמסים\n- פני הים עולים\n- סערות קיצוניות יותר\n- בצורות ושיטפונות\n- חיות ללא בתי גידול\n\nמה אנחנו יכולים לעשות?\n- להשתמש באנרגיה מתחדשת (שמש, רוח)\n- לחסוך באנרגיה\n- להשתמש בתחבורה ציבורית\n- לצמצם פסולת\n- לנטוע עצים\n- לתמוך במדיניות ירוקה\n\nזה לא רק עניין של מדינות - כל אחד מאיתנו יכול לעזור!",
        category: "science",
        categoryHe: "מדעים",
        ageGroup: "11+",
        readingTime: 9,
        icon: "🌍",
        tags: ["אקלים", "סביבה", "מדע"],
        isPopular: true
      }
    ];

    sampleTopics.forEach(topic => {
      const newTopic: Topic = {
        id: this.currentTopicId++,
        ...topic,
        titleEn: topic.titleEn || null,
        tags: topic.tags || null,
        isDaily: topic.isDaily || null,
        dailyDate: topic.dailyDate || null,
        isPopular: topic.isPopular || null,
        createdAt: new Date()
      };
      this.topics.set(newTopic.id, newTopic);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTopic(id: number): Promise<Topic | undefined> {
    return this.topics.get(id);
  }

  async getAllTopics(): Promise<Topic[]> {
    return Array.from(this.topics.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getTopicsByCategory(category: string): Promise<Topic[]> {
    return Array.from(this.topics.values())
      .filter(topic => topic.category === category)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getTopicsByAgeGroup(ageGroup: string): Promise<Topic[]> {
    return Array.from(this.topics.values())
      .filter(topic => topic.ageGroup === ageGroup)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getPopularTopics(): Promise<Topic[]> {
    return Array.from(this.topics.values())
      .filter(topic => topic.isPopular)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getDailyTopic(date?: Date): Promise<Topic | undefined> {
    const today = date || new Date();
    const todayStr = today.toDateString();
    
    return Array.from(this.topics.values())
      .find(topic => 
        topic.isDaily && 
        topic.dailyDate && 
        new Date(topic.dailyDate).toDateString() === todayStr
      );
  }

  async searchTopics(query: string): Promise<Topic[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.topics.values())
      .filter(topic => 
        topic.title.toLowerCase().includes(lowercaseQuery) ||
        topic.excerpt.toLowerCase().includes(lowercaseQuery) ||
        topic.content.toLowerCase().includes(lowercaseQuery) ||
        topic.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const id = this.currentTopicId++;
    const topic: Topic = { 
      ...insertTopic,
      id,
      titleEn: insertTopic.titleEn || null,
      tags: insertTopic.tags || null,
      isDaily: insertTopic.isDaily || null,
      dailyDate: insertTopic.dailyDate || null,
      isPopular: insertTopic.isPopular || null,
      createdAt: new Date() 
    };
    this.topics.set(id, topic);
    return topic;
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getTopic(id: number): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    return topic || undefined;
  }

  async getAllTopics(): Promise<Topic[]> {
    return await db.select().from(topics).orderBy(topics.createdAt);
  }

  async getTopicsByCategory(category: string): Promise<Topic[]> {
    return await db.select().from(topics).where(eq(topics.category, category));
  }

  async getTopicsByAgeGroup(ageGroup: string): Promise<Topic[]> {
    return await db.select().from(topics).where(eq(topics.ageGroup, ageGroup));
  }

  async getPopularTopics(): Promise<Topic[]> {
    return await db.select().from(topics).where(eq(topics.isPopular, true));
  }

  async getDailyTopic(date?: Date): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.isDaily, true));
    return topic || undefined;
  }

  async searchTopics(query: string): Promise<Topic[]> {
    // Note: This is a simplified search. In production, you'd use full-text search
    const allTopics = await db.select().from(topics);
    const lowercaseQuery = query.toLowerCase();
    return allTopics.filter(topic => 
      topic.title.toLowerCase().includes(lowercaseQuery) ||
      topic.excerpt.toLowerCase().includes(lowercaseQuery) ||
      topic.content.toLowerCase().includes(lowercaseQuery) ||
      topic.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const [topic] = await db
      .insert(topics)
      .values(insertTopic)
      .returning();
    return topic;
  }
}

// Use database storage in production, memory storage for development if DB unavailable
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
