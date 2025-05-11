
import { Quote } from "@/types/quote";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface QuoteCardProps {
  quote: Quote;
  onNewQuote: () => void;
  onDelete?: (id: string) => void;
}

const QuoteCard = ({ quote, onNewQuote, onDelete }: QuoteCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onNewQuote();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <Card className={`quote-card p-8 relative overflow-hidden ${isAnimating ? 'animate-fade-out' : 'animate-fade-in'}`}>
        <span className="quote-mark quote-mark-left text-quote-primary">"</span>
        
        <CardContent className="p-0 z-10 relative">
          <blockquote className="mb-6 relative z-10">
            <p className="quote-text text-xl md:text-2xl leading-relaxed text-quote-dark mb-4">
              {quote.text}
            </p>
            <footer className="flex items-center justify-between">
              <div>
                <cite className="quote-author text-lg text-quote-accent not-italic">
                  {quote.author}
                </cite>
                {quote.source && (
                  <p className="text-sm text-gray-500 mt-1">{quote.source}</p>
                )}
              </div>
              
              {quote.tags && quote.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {quote.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-quote-secondary text-quote-accent px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </footer>
          </blockquote>
        </CardContent>
        
        <span className="quote-mark quote-mark-right text-quote-primary">"</span>
      </Card>

      <div className="flex justify-between mt-4">
        <Button 
          onClick={handleNewQuote}
          className="bg-quote-primary hover:bg-quote-accent transition-all duration-300 gap-2 group"
        >
          <Icon name="RefreshCw" className="group-hover:rotate-180 transition-all duration-500" />
          Новая цитата
        </Button>
        
        {onDelete && (
          <Button 
            variant="outline" 
            onClick={() => onDelete(quote.id)}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2"
          >
            <Icon name="Trash2" size={16} />
            Удалить
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
