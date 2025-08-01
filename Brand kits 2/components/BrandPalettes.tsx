export interface BrandPalette {
  id: number;
  name: string;
  description: string;
  colors: {
    primary: string;      // Основний колір (логотип)
    secondary: string;    // Вторинний колір (акценти, CTA)
    background: string;   // Фон
    surface: string;      // Поверхні (картки, панелі)
    text: string;         // Основний текст
    textMuted: string;    // Вторинний текст
    border: string;       // Рамки
    success: string;      // Прибуток/успіх
    warning: string;      // Попередження
    error: string;        // Збиток/помилка
  };
  level: 'conservative' | 'moderate' | 'bold';
  theme: 'light' | 'dark';
}

export const brandPalettes: BrandPalette[] = [
  // CONSERVATIVE LIGHT (1-10) - Покращена контрастність
  {
    id: 1,
    name: "Класичний Професійний",
    description: "Оригінальна палітра з оптимальною контрастністю",
    colors: {
      primary: "#003d66",
      secondary: "#0056b3", 
      background: "#ffffff",
      surface: "#f8fafb",
      text: "#1a1a1a",
      textMuted: "#525252",
      border: "#d1d5db",
      success: "#16a34a",
      warning: "#d97706",
      error: "#dc2626"
    },
    level: 'conservative',
    theme: 'light'
  },
  {
    id: 2,
    name: "Глибокий Океан",
    description: "Насичені сині відтінки з високою читабельністю",
    colors: {
      primary: "#0c2340",
      secondary: "#1e3a5f",
      background: "#ffffff",
      surface: "#f9fbfc",
      text: "#0f172a",
      textMuted: "#475569",
      border: "#cbd5e1",
      success: "#059669",
      warning: "#d97706",
      error: "#b91c1c"
    },
    level: 'conservative',
    theme: 'light'
  },
  {
    id: 3,
    name: "Корпоративна Довіра",
    description: "Стандартні кольори з покращеною ергономікою",
    colors: {
      primary: "#1e40af",
      secondary: "#2563eb",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#111827",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626"
    },
    level: 'conservative',
    theme: 'light'
  },
  {
    id: 4,
    name: "Фінтех Стабільність",
    description: "Надійні кольори з оптимальною контрастністю",
    colors: {
      primary: "#0f172a",
      secondary: "#1e3a8a",
      background: "#ffffff",
      surface: "#f9fafb",
      text: "#0f172a",
      textMuted: "#374151",
      border: "#e5e7eb",
      success: "#16a34a",
      warning: "#ea580c",
      error: "#dc2626"
    },
    level: 'conservative',
    theme: 'light'
  },
  {
    id: 5,
    name: "Технологічна Точність",
    description: "Четкі лінії та оптимальні контрасти",
    colors: {
      primary: "#1e3a8a",
      secondary: "#3b82f6",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#111827",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#16a34a",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'conservative',
    theme: 'light'
  },
  {
    id: 6,
    name: "Банківська Елегантність",
    description: "Престижні відтінки з покращеною читабельністю",
    colors: {
      primary: "#0c4a6e",
      secondary: "#0ea5e9",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#0c4a6e",
      textMuted: "#475569",
      border: "#cbd5e1",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626"
    },
    level: 'conservative',
    theme: 'light'
  },
  {
    id: 7,
    name: "Цифрова Безпека",
    description: "Кольори кібербезпеки з високою контрастністю",
    colors: {
      primary: "#164e63",
      secondary: "#0891b2",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#0f172a",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'conservative',
    theme: 'light'
  },
  {
    id: 8,
    name: "Професійна Аналітика",
    description: "Серйозні тони для легкого сприйняття",
    colors: {
      primary: "#075985",
      secondary: "#0284c7",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#0f172a",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#16a34a",
      warning: "#ea580c",
      error: "#dc2626"
    },
    level: 'conservative',
    theme: 'light'
  },
  {
    id: 9,
    name: "Інституційний Підхід",
    description: "Кольори фінансових інститутів з ергономікою",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      background: "#ffffff",
      surface: "#f9fafb",
      text: "#111827",
      textMuted: "#374151",
      border: "#e5e7eb",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626"
    },
    level: 'conservative',
    theme: 'light'
  },
  {
    id: 10,
    name: "Консультативна Експертиза",
    description: "Авторитетні відтінки з покращеною читабельністю",
    colors: {
      primary: "#0c4a6e",
      secondary: "#0ea5e9",
      background: "#ffffff",
      surface: "#f9fafb",
      text: "#111827",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'conservative',
    theme: 'light'
  },

  // MODERATE LIGHT (11-20) - Покращена контрастність
  {
    id: 11,
    name: "Сучасний Фінтех",
    description: "Баланс традицій та інновацій з високою читабельністю",
    colors: {
      primary: "#1e40af",
      secondary: "#7c3aed",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#111827",
      textMuted: "#374151",
      border: "#e5e7eb",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'moderate',
    theme: 'light'
  },
  {
    id: 12,
    name: "Крипто Інновації",
    description: "Технологічне майбутнє з оптимальними контрастами",
    colors: {
      primary: "#1e3a8a",
      secondary: "#6366f1",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#0f172a",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#16a34a",
      warning: "#f59e0b",
      error: "#dc2626"
    },
    level: 'moderate',
    theme: 'light'
  },
  {
    id: 13,
    name: "Цифрова Трансформація",
    description: "Еволюція традиційних фінансів з ергономікою",
    colors: {
      primary: "#0c4a6e",
      secondary: "#8b5cf6",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#0f172a",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626"
    },
    level: 'moderate',
    theme: 'light'
  },
  {
    id: 14,
    name: "Альтернативні Інвестиції",
    description: "Нові можливості з покращеною читабельністю",
    colors: {
      primary: "#075985",
      secondary: "#06b6d4",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#0f172a",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'moderate',
    theme: 'light'
  },
  {
    id: 15,
    name: "Смарт Інвестинг",
    description: "Розумні рішення з оптимальною контрастністю",
    colors: {
      primary: "#1e40af",
      secondary: "#0d9488",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#111827",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#16a34a",
      warning: "#ea580c",
      error: "#dc2626"
    },
    level: 'moderate',
    theme: 'light'
  },
  {
    id: 16,
    name: "Алгоритмічна Торгівля",
    description: "Високотехнологічний підхід з ергономікою",
    colors: {
      primary: "#164e63",
      secondary: "#06b6d4",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#0f172a",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626"
    },
    level: 'moderate',
    theme: 'light'
  },
  {
    id: 17,
    name: "Блокчейн Академія",
    description: "Освітні кольори з покращеною читабельністю",
    colors: {
      primary: "#1e3a8a",
      secondary: "#059669",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#111827",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'moderate',
    theme: 'light'
  },
  {
    id: 18,
    name: "ДеФі Освіта",
    description: "Децентралізована освіта з оптимальними контрастами",
    colors: {
      primary: "#0c4a6e",
      secondary: "#059669",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#111827",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#16a34a",
      warning: "#f59e0b",
      error: "#dc2626"
    },
    level: 'moderate',
    theme: 'light'
  },
  {
    id: 19,
    name: "Квантова Фінанси",
    description: "Майбутнє фінансових технологій з ергономікою",
    colors: {
      primary: "#075985",
      secondary: "#0891b2",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#0f172a",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#16a34a",
      warning: "#ea580c",
      error: "#ef4444"
    },
    level: 'moderate',
    theme: 'light'
  },
  {
    id: 20,
    name: "Віртуальна Економіка",
    description: "Цифрові активи з покращеною читабельністю",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#111827",
      textMuted: "#374151",
      border: "#d1d5db",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626"
    },
    level: 'moderate',
    theme: 'light'
  },

  // CONSERVATIVE DARK (31-40)
  {
    id: 31,
    name: "Класичний Професійний Dark",
    description: "Темна версія класичної палітри з оптимальною контрастністю",
    colors: {
      primary: "#60a5fa",
      secondary: "#3b82f6", 
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f1f5f9",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'conservative',
    theme: 'dark'
  },
  {
    id: 32,
    name: "Глибокий Океан Dark",
    description: "Темна версія з насиченими синіми відтінками",
    colors: {
      primary: "#38bdf8",
      secondary: "#0ea5e9",
      background: "#0c1420",
      surface: "#1e293b",
      text: "#f8fafc",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#f87171"
    },
    level: 'conservative',
    theme: 'dark'
  },
  {
    id: 33,
    name: "Корпоративна Довіра Dark",
    description: "Темна корпоративна палітра з високою читабельністю",
    colors: {
      primary: "#60a5fa",
      secondary: "#3b82f6",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textMuted: "#d1d5db",
      border: "#374151",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'conservative',
    theme: 'dark'
  },
  {
    id: 34,
    name: "Фінтех Стабільність Dark",
    description: "Темна версія надійних фінансових кольорів",
    colors: {
      primary: "#93c5fd",
      secondary: "#60a5fa",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f8fafc",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'conservative',
    theme: 'dark'
  },
  {
    id: 35,
    name: "Технологічна Точність Dark",
    description: "Темна версія з чіткими контрастами",
    colors: {
      primary: "#60a5fa",
      secondary: "#818cf8",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textMuted: "#d1d5db",
      border: "#374151",
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'conservative',
    theme: 'dark'
  },
  {
    id: 36,
    name: "Банківська Елегантність Dark",
    description: "Темна престижна палітра для фінансів",
    colors: {
      primary: "#0ea5e9",
      secondary: "#38bdf8",
      background: "#0c1420",
      surface: "#1e293b",
      text: "#e2e8f0",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'conservative',
    theme: 'dark'
  },
  {
    id: 37,
    name: "Цифрова Безпека Dark",
    description: "Темна версія кольорів кібербезпеки",
    colors: {
      primary: "#22d3ee",
      secondary: "#06b6d4",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f1f5f9",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'conservative',
    theme: 'dark'
  },
  {
    id: 38,
    name: "Професійна Аналітика Dark",
    description: "Темна версія для фінансового аналізу",
    colors: {
      primary: "#0ea5e9",
      secondary: "#38bdf8",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f1f5f9",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'conservative',
    theme: 'dark'
  },
  {
    id: 39,
    name: "Інституційний Підхід Dark",
    description: "Темна версія великих фінансових інститутів",
    colors: {
      primary: "#60a5fa",
      secondary: "#818cf8",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textMuted: "#d1d5db",
      border: "#374151",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'conservative',
    theme: 'dark'
  },
  {
    id: 40,
    name: "Консультативна Експертиза Dark",
    description: "Темна авторитетна палітра консалтингу",
    colors: {
      primary: "#0ea5e9",
      secondary: "#38bdf8",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textMuted: "#d1d5db",
      border: "#374151",
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'conservative',
    theme: 'dark'
  },

  // MODERATE DARK (41-50)
  {
    id: 41,
    name: "Сучасний Фінтех Dark",
    description: "Темна версія балансу традицій та інновацій",
    colors: {
      primary: "#60a5fa",
      secondary: "#a855f7",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textMuted: "#d1d5db",
      border: "#374151",
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'moderate',
    theme: 'dark'
  },
  {
    id: 42,
    name: "Крипто Інновації Dark",
    description: "Темна версія технологічного майбутнього",
    colors: {
      primary: "#818cf8",
      secondary: "#a78bfa",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f8fafc",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'moderate',
    theme: 'dark'
  },
  {
    id: 43,
    name: "Цифрова Трансформація Dark",
    description: "Темна еволюція традиційних фінансів",
    colors: {
      primary: "#0ea5e9",
      secondary: "#a855f7",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f1f5f9",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'moderate',
    theme: 'dark'
  },
  {
    id: 44,
    name: "Альтернативні Інвестиції Dark",
    description: "Темна версія нових можливостей",
    colors: {
      primary: "#0ea5e9",
      secondary: "#22d3ee",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f1f5f9",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'moderate',
    theme: 'dark'
  },
  {
    id: 45,
    name: "Смарт Інвестинг Dark",
    description: "Темна версія розумних рішень",
    colors: {
      primary: "#60a5fa",
      secondary: "#14b8a6",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textMuted: "#d1d5db",
      border: "#374151",
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'moderate',
    theme: 'dark'
  },
  {
    id: 46,
    name: "Алгоритмічна Торгівля Dark",
    description: "Темна високотехнологічна палітра",
    colors: {
      primary: "#22d3ee",
      secondary: "#06b6d4",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f1f5f9",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'moderate',
    theme: 'dark'
  },
  {
    id: 47,
    name: "Блокчейн Академія Dark",
    description: "Темна освітня палітра нової ери",
    colors: {
      primary: "#818cf8",
      secondary: "#10b981",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textMuted: "#d1d5db",
      border: "#374151",
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'moderate',
    theme: 'dark'
  },
  {
    id: 48,
    name: "ДеФі Освіта Dark",
    description: "Темна децентралізована фінансова освіта",
    colors: {
      primary: "#0ea5e9",
      secondary: "#10b981",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f1f5f9",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'moderate',
    theme: 'dark'
  },
  {
    id: 49,
    name: "Квантова Фінанси Dark",
    description: "Темне майбутнє фінансових технологій",
    colors: {
      primary: "#0ea5e9",
      secondary: "#22d3ee",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f1f5f9",
      textMuted: "#cbd5e1",
      border: "#334155",
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#f87171"
    },
    level: 'moderate',
    theme: 'dark'
  },
  {
    id: 50,
    name: "Віртуальна Економіка Dark",
    description: "Темні цифрові активи та метавсесвіт",
    colors: {
      primary: "#60a5fa",
      secondary: "#818cf8",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textMuted: "#d1d5db",
      border: "#374151",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'moderate',
    theme: 'dark'
  },

  // BOLD (21-30) - Сміливі варіанти (без змін)
  {
    id: 21,
    name: "Неон Крипто",
    description: "Яскраві акценти майбутнього",
    colors: {
      primary: "#1e3a8a",
      secondary: "#00d4ff",
      background: "#fafafa",
      surface: "#f0f9ff",
      text: "#0f172a",
      textMuted: "#475569",
      border: "#7dd3fc",
      success: "#00ff88",
      warning: "#ffaa00",
      error: "#ff4444"
    },
    level: 'bold',
    theme: 'light'
  },
  {
    id: 22,
    name: "Кібер Трейдинг",
    description: "Футуристичний дизайн торгової платформи",
    colors: {
      primary: "#0c4a6e",
      secondary: "#00e5ff",
      background: "#f8fafc",
      surface: "#e0f2fe",
      text: "#0f172a",
      textMuted: "#475569",
      border: "#67e8f9",
      success: "#00ff94",
      warning: "#ff9500",
      error: "#ff3838"
    },
    level: 'bold',
    theme: 'light'
  },
  {
    id: 23,
    name: "Цифровий Золотий Вік",
    description: "Поєднання класики та інновацій",
    colors: {
      primary: "#164e63",
      secondary: "#facc15",
      background: "#ffffff",
      surface: "#fefce8",
      text: "#365314",
      textMuted: "#64748b",
      border: "#fde047",
      success: "#22c55e",
      warning: "#eab308",
      error: "#dc2626"
    },
    level: 'bold',
    theme: 'light'
  },
  {
    id: 24,
    name: "Торгівля Майбутнього",
    description: "Високотехнологічна торгова платформа",
    colors: {
      primary: "#1e40af",
      secondary: "#06ffa5",
      background: "#fefefe",
      surface: "#f0fdf4",
      text: "#14532d",
      textMuted: "#6b7280",
      border: "#86efac",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'bold',
    theme: 'light'
  },
  {
    id: 25,
    name: "Електронна Валюта",
    description: "Енергійні кольори цифрових грошей",
    colors: {
      primary: "#0c4a6e",
      secondary: "#22d3ee",
      background: "#ffffff",
      surface: "#cffafe",
      text: "#164e63",
      textMuted: "#64748b",
      border: "#67e8f9",
      success: "#06b6d4",
      warning: "#f59e0b",
      error: "#dc2626"
    },
    level: 'bold',
    theme: 'light'
  },
  {
    id: 26,
    name: "Космічна Економіка",
    description: "Міжпланетарна фінансова система",
    colors: {
      primary: "#1e3a8a",
      secondary: "#a855f7",
      background: "#fefefe",
      surface: "#faf5ff",
      text: "#581c87",
      textMuted: "#6b7280",
      border: "#d8b4fe",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'bold',
    theme: 'light'
  },
  {
    id: 27,
    name: "Голографічні Фінанси",
    description: "3D візуалізація фінансових даних",
    colors: {
      primary: "#075985",
      secondary: "#06b6d4",
      background: "#ffffff",
      surface: "#e0f2fe",
      text: "#0c4a6e",
      textMuted: "#64748b",
      border: "#0891b2",
      success: "#0d9488",
      warning: "#f59e0b",
      error: "#dc2626"
    },
    level: 'bold',
    theme: 'light'
  },
  {
    id: 28,
    name: "Штучний Інтелект Фінансів",
    description: "AI-керовані інвестиційні рішення",
    colors: {
      primary: "#164e63",
      secondary: "#8b5cf6",
      background: "#fefefe",
      surface: "#f3f4f6",
      text: "#111827",
      textMuted: "#6b7280",
      border: "#c4b5fd",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    level: 'bold',
    theme: 'light'
  },
  {
    id: 29,
    name: "Квантовий Стрибок",
    description: "Революційні технології торгівлі",
    colors: {
      primary: "#1e40af",
      secondary: "#10b981",
      background: "#ffffff",
      surface: "#f0f9ff",
      text: "#0f172a",
      textMuted: "#475569",
      border: "#bfdbfe",
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#ef4444"
    },
    level: 'bold',
    theme: 'light'
  },
  {
    id: 30,
    name: "Гіпер Інноваційний",
    description: "Максимальне відхилення в межах синьої гами",
    colors: {
      primary: "#0c4a6e",
      secondary: "#14b8a6",
      background: "#fafbfc",
      surface: "#e6fffa",
      text: "#134e4a",
      textMuted: "#6b7280",
      border: "#5eead4",
      success: "#06d6a0",
      warning: "#ffd23f",
      error: "#ff6b6b"
    },
    level: 'bold',
    theme: 'light'
  }
];

// Export utility functions
export const getPalettesByLevel = (level: 'conservative' | 'moderate' | 'bold') => {
  return brandPalettes.filter(palette => palette.level === level);
};

export const getPalettesByTheme = (theme: 'light' | 'dark') => {
  return brandPalettes.filter(palette => palette.theme === theme);
};

export const getConservativeAndModeratePalettes = () => {
  return brandPalettes.filter(palette => palette.level !== 'bold');
};

export const exportPaletteAsCSS = (palette: BrandPalette): string => {
  return `:root {
  /* ${palette.name} - ${palette.description} */
  --color-primary: ${palette.colors.primary};
  --color-secondary: ${palette.colors.secondary};
  --color-background: ${palette.colors.background};
  --color-surface: ${palette.colors.surface};
  --color-text: ${palette.colors.text};
  --color-text-muted: ${palette.colors.textMuted};
  --color-border: ${palette.colors.border};
  --color-success: ${palette.colors.success};
  --color-warning: ${palette.colors.warning};
  --color-error: ${palette.colors.error};
}`;
};

export const exportPaletteAsJSON = (palette: BrandPalette): string => {
  return JSON.stringify({
    name: palette.name,
    description: palette.description,
    level: palette.level,
    theme: palette.theme,
    colors: palette.colors
  }, null, 2);
};

export const exportPaletteAsSCSS = (palette: BrandPalette): string => {
  return `// ${palette.name} - ${palette.description}
$primary: ${palette.colors.primary};
$secondary: ${palette.colors.secondary};
$background: ${palette.colors.background};
$surface: ${palette.colors.surface};
$text: ${palette.colors.text};
$text-muted: ${palette.colors.textMuted};
$border: ${palette.colors.border};
$success: ${palette.colors.success};
$warning: ${palette.colors.warning};
$error: ${palette.colors.error};`;
};

export const exportPaletteAsJavaScript = (palette: BrandPalette): string => {
  return `// ${palette.name} - ${palette.description}
export const ${palette.name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')}Palette = {
  name: "${palette.name}",
  description: "${palette.description}",
  level: "${palette.level}",
  theme: "${palette.theme}",
  colors: ${JSON.stringify(palette.colors, null, 2)}
};`;
};

export const exportPaletteAsSketch = (palette: BrandPalette): string => {
  // Sketch JSON format for color variables
  const colors = Object.entries(palette.colors).map(([name, color]) => ({
    name: `${palette.name}/${name}`,
    value: color
  }));
  
  return JSON.stringify({
    name: palette.name,
    description: palette.description,
    colors: colors
  }, null, 2);
};

export const exportPaletteAsFigma = (palette: BrandPalette): string => {
  // Figma token format
  const tokens = Object.entries(palette.colors).reduce((acc, [name, color]) => {
    acc[name] = {
      value: color,
      type: "color",
      description: `${palette.name} ${name} color`
    };
    return acc;
  }, {} as any);

  return JSON.stringify({
    name: palette.name,
    description: palette.description,
    tokens: tokens
  }, null, 2);
};