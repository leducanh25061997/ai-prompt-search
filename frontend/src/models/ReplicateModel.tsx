interface ReplicateSDRequest {
    prompt: string,
    model_name?: string,
    version?: string,
    num_outputs?: number
}

interface ReplicateSDResponse {
    id: string,
    version: string,
    urls: {
        get: string,
        cancel: string,
    },
    output: any[] | null,
    created_at: string | null,
    started_at?: string | null,
    complted_at?: string | null,
    status: string,
    input?: {
        prompt?: string,
        negative_prompt?: string,
        width?: number,
        height?: number,
        prompt_strength?: number,
        num_outputs?: number,
        num_inference_steps?: number,
        guidance_scale?: number,
        scheduler?: number,
        seed?: number,
    },
    error: string | null,
    logs: string,
    metrics: any
}

export type { ReplicateSDRequest, ReplicateSDResponse };

export const isReplicateResponse = (object: any): object is ReplicateSDResponse => {
    return "id" in object;
} 
