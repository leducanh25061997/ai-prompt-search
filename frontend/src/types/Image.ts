export interface ImageDetailResponse {
    create_at: string;
    deleted: boolean;
    download: number;
    generated: boolean;
    hidden: boolean;
    id: number;
    image_url: string;
    likes: number;
    nsfw: boolean;
    remix: number;
    share: number;
    source_id: string;
    views: number;
    params: Params;
    prompt: string;
    promptContent: string;
    promptId: number;
    title: string;
    imageUrl: string;
    source: string;
}

interface Params {
    height: number;
    sampler: string;
    steps: number;
    width: number;
}