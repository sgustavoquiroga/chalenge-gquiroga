export interface ExchangeResponse {
  success: boolean;
  timestamp: number;
  historical: boolean;
  base: string;
  date: string;
  rates: Rates;
}

export interface Rates {
  [key: string]: number;
}
