import { Tracker } from "./Enum";

export interface FilterParams {
  page?: number;
  keyword?: string;
  limit?: number;
  user_id?: number;
  filters?: Filters;
  result_id?: string;
  size?: string;
}

interface Filters {
  model?: string;
  orientation?: string;
  resolution?: string;
}

export interface FilterTrackerParams {
  user_id: number;
  results_id: number;
  action: Tracker;
  prompt?: string; 
  filters?: Filters;
}