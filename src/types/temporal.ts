export interface AncientTimeSystemColumn {
  id: string;
  systemName: string;
  bulletPoints: string[];
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}
