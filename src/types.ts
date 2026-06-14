export interface Specs {
  Processor: string;
  RAM: string;
  Storage: string;
  Display: string;
  GPU: string;
}

export interface Store {
  name: string;
  price: string;
  url: string;
}

export interface Laptop {
  rank: number;
  name: string;
  brand: string;
  price: string;
  useTags: Array<'coding' | 'gaming' | 'editing'>;
  specs: Specs;
  imageQuery: string;
  imageUrl?: string;
  stores: Store[];
}

export interface BestPick {
  name: string;
  brand: string;
  price: string;
  specs: Specs;
  whyBest: string;
  imageQuery: string;
  imageUrl?: string;
  stores: Store[];
}

export interface AIResponse {
  summary: string;
  totalFound: number | string;
  bestPick: BestPick;
  laptops: Laptop[];
}
