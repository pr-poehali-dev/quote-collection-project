
export interface Quote {
  id: string;
  text: string;
  author: string;
  source?: string;
  addedAt: number;
  tags?: string[];
}

export type QuoteFormData = Omit<Quote, 'id' | 'addedAt'>;
