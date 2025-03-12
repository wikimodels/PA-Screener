export interface MarketSummary {
  type: string; // Required
  title: string; // Required
  data: { openTime: number; count: number }[]; // Required
}
