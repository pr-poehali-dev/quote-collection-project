
import { Quote } from "@/types/quote";

// Предустановленные цитаты
const DEFAULT_QUOTES: Quote[] = [
  {
    id: "1",
    text: "Две вещи наполняют душу всегда новым и все более сильным удивлением и благоговением, чем чаще и продолжительнее мы размышляем о них, — это звездное небо надо мной и моральный закон во мне.",
    author: "Иммануил Кант",
    source: "Критика практического разума",
    addedAt: 1620000000000,
    tags: ["философия", "этика"]
  },
  {
    id: "2",
    text: "Тот, кто хочет видеть результаты своего труда немедленно, должен идти в сапожники.",
    author: "Альберт Эйнштейн",
    addedAt: 1620100000000,
    tags: ["наука", "труд"]
  },
  {
    id: "3",
    text: "Если вы хотите вести счастливую жизнь, вы должны быть привязаны к цели, а не к людям или вещам.",
    author: "Альберт Эйнштейн",
    addedAt: 1620200000000,
    tags: ["счастье", "цель"]
  },
  {
    id: "4",
    text: "Жизнь — это то, что с тобой происходит, пока ты строишь другие планы.",
    author: "Джон Леннон",
    addedAt: 1620300000000,
    tags: ["жизнь", "планы"]
  },
  {
    id: "5",
    text: "Счастье — это не нечто готовое. Счастье зависит от ваших действий.",
    author: "Далай-лама XIV",
    addedAt: 1620400000000,
    tags: ["счастье", "действие"]
  },
  {
    id: "6",
    text: "Программирование — это не о том, что вы знаете; это о том, что вы можете выяснить.",
    author: "Крис Пайн",
    addedAt: 1620500000000,
    tags: ["программирование", "знания"]
  },
  {
    id: "7",
    text: "Лучшее время, чтобы посадить дерево, было 20 лет назад. Второе лучшее время — сейчас.",
    author: "Китайская пословица",
    addedAt: 1620600000000,
    tags: ["время", "действие"]
  }
];

const STORAGE_KEY = "quotes_collection";

export const QuoteStorage = {
  getAll: (): Quote[] => {
    try {
      const storedQuotes = localStorage.getItem(STORAGE_KEY);
      if (!storedQuotes) {
        // Первый запуск: сохраняем дефолтные цитаты
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUOTES));
        return DEFAULT_QUOTES;
      }
      return JSON.parse(storedQuotes);
    } catch (error) {
      console.error("Ошибка при получении цитат:", error);
      return DEFAULT_QUOTES;
    }
  },

  saveAll: (quotes: Quote[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
    } catch (error) {
      console.error("Ошибка при сохранении цитат:", error);
    }
  },

  add: (quote: Omit<Quote, "id" | "addedAt">): Quote => {
    const quotes = QuoteStorage.getAll();
    const newQuote: Quote = {
      ...quote,
      id: crypto.randomUUID(),
      addedAt: Date.now()
    };
    
    quotes.push(newQuote);
    QuoteStorage.saveAll(quotes);
    return newQuote;
  },

  delete: (id: string): boolean => {
    const quotes = QuoteStorage.getAll();
    const filteredQuotes = quotes.filter(q => q.id !== id);
    
    if (filteredQuotes.length < quotes.length) {
      QuoteStorage.saveAll(filteredQuotes);
      return true;
    }
    return false;
  },

  getRandom: (): Quote | null => {
    const quotes = QuoteStorage.getAll();
    if (quotes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  },

  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
