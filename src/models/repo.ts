export interface RepoKline {
  symbol: string;
  openTime: number;
  closeTime: number;
  exchanges: string[];
  category: string;
  imageUrl: string;
}

export interface RepoItem {
  openTime: number;
  closeTime: number;
  repoKlines: RepoKline[];
}

// model/repo.ts
export interface ReportRepo {
  repoType: string;
  repoItems: RepoItem[];
}
