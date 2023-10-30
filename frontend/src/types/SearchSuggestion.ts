export interface SearchSuggestionResponse {
    status_code: number;
    msg: string;
    results: Results;
}

export interface Results {
    recent_searches: string[];
    trending_searches: string[];
    trending_styles: TrendingStyles[];
}

interface TrendingStyles {
    name: string;
    id: number;
    sample_url: string;
}