
import { useState } from "react";
import { QuoteFormData } from "@/types/quote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface QuoteFormProps {
  onSubmit: (quoteData: QuoteFormData) => void;
  onCancel: () => void;
}

const QuoteForm = ({ onSubmit, onCancel }: QuoteFormProps) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    text: "",
    author: "",
    source: "",
    tags: []
  });
  
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Очищаем ошибку при вводе
    if (errors[name as keyof QuoteFormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() === "") return;
    
    // Проверяем, что тег уже не существует
    if (formData.tags?.includes(tagInput.trim().toLowerCase())) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput.trim().toLowerCase()]
    }));
    setTagInput("");
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};
    
    if (!formData.text.trim()) {
      newErrors.text = "Текст цитаты обязателен";
    }
    
    if (!formData.author.trim()) {
      newErrors.author = "Автор цитаты обязателен";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-slide-in">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-quote-primary">Добавить цитату</CardTitle>
        <CardDescription>Поделитесь мудростью, которая вас вдохновляет</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-medium">
              Текст цитаты *
            </label>
            <Textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Введите текст цитаты..."
              className={`min-h-[120px] ${errors.text ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.text && <p className="text-destructive text-sm">{errors.text}</p>}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium">
              Автор *
            </label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Имя автора"
              className={errors.author ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.author && <p className="text-destructive text-sm">{errors.author}</p>}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="source" className="text-sm font-medium">
              Источник <span className="text-muted-foreground text-xs">(необязательно)</span>
            </label>
            <Input
              id="source"
              name="source"
              value={formData.source || ""}
              onChange={handleChange}
              placeholder="Книга, фильм, или другой источник"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Теги <span className="text-muted-foreground text-xs">(необязательно)</span>
            </label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Добавить тег..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button 
                type="button" 
                size="sm" 
                variant="secondary"
                onClick={addTag}
              >
                Добавить
              </Button>
            </div>
            
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-quote-secondary flex items-center gap-1 text-quote-accent px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-quote-accent hover:text-destructive focus:outline-none"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button 
            type="submit" 
            className="bg-quote-primary hover:bg-quote-accent"
          >
            Сохранить цитату
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default QuoteForm;
