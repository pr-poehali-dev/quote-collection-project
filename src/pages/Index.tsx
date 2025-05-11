
import { useState, useEffect } from "react";
import { Quote, QuoteFormData } from "@/types/quote";
import { QuoteStorage } from "@/utils/quoteStorage";
import QuoteCard from "@/components/QuoteCard";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // При первой загрузке показываем случайную цитату
    const randomQuote = QuoteStorage.getRandom();
    setCurrentQuote(randomQuote);
  }, []);

  const handleNewQuote = () => {
    const newQuote = QuoteStorage.getRandom();
    if (newQuote && newQuote.id === currentQuote?.id) {
      // Если выпала та же цитата, ищем другую
      const quotes = QuoteStorage.getAll();
      if (quotes.length > 1) {
        const filteredQuotes = quotes.filter(q => q.id !== currentQuote.id);
        const anotherRandomIndex = Math.floor(Math.random() * filteredQuotes.length);
        setCurrentQuote(filteredQuotes[anotherRandomIndex]);
      } else {
        setCurrentQuote(newQuote);
      }
    } else {
      setCurrentQuote(newQuote);
    }
  };

  const handleAddQuote = (quoteData: QuoteFormData) => {
    const newQuote = QuoteStorage.add(quoteData);
    setCurrentQuote(newQuote);
    setShowForm(false);
    
    toast({
      title: "Цитата добавлена",
      description: "Ваша цитата успешно добавлена в коллекцию"
    });
  };

  const handleDeleteQuote = (id: string) => {
    if (QuoteStorage.delete(id)) {
      toast({
        title: "Цитата удалена",
        description: "Цитата была удалена из коллекции"
      });
      handleNewQuote();
    }
  };

  // Если данных еще нет (загрузка), показываем загрузочный элемент
  if (!currentQuote) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 mb-4 text-quote-primary">
            <Icon name="RefreshCw" className="animate-spin" size={32} />
          </div>
          <p className="text-lg text-quote-dark">Загрузка мудрости...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-quote-light bg-opacity-70 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-quote-dark mb-2">
            Мудрые слова
          </h1>
          <p className="text-quote-accent text-lg max-w-xl mx-auto">
            Коллекция вдохновляющих цитат для размышления и мотивации
          </p>
        </header>

        {showForm ? (
          <QuoteForm 
            onSubmit={handleAddQuote} 
            onCancel={() => setShowForm(false)} 
          />
        ) : (
          <>
            <QuoteCard 
              quote={currentQuote} 
              onNewQuote={handleNewQuote}
              onDelete={handleDeleteQuote}
            />
            
            <div className="mt-10 text-center">
              <Button 
                onClick={() => setShowForm(true)}
                variant="outline" 
                className="border-quote-primary text-quote-primary hover:bg-quote-secondary hover:text-quote-accent gap-2"
              >
                <Icon name="Plus" size={18} />
                Добавить свою цитату
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Index;
