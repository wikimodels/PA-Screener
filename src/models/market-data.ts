import { RepoItem } from './repo';

export interface MarketData {
  id?: string;
  type: string;
  title: string;
  data: RepoItem[];
}
