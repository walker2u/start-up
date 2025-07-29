export interface Outcome {
  name: 'Yes' | 'No';
  price: number; // A value between 0.01 and 0.99, representing the probability
  color: 'green' | 'red';
}

export interface Market {
  id: string;
  question: string;
  imageUrl: string;
  category: string;
  volume: number;
  outcomes: [Outcome, Outcome];
}