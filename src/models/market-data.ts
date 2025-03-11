import { RepoItem } from './repo';

export interface MarketData {
  type: string;
  title: string;
  data: RepoItem[];
}
