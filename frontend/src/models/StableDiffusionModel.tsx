/// 
    // This Stable Diffusion Models is use for Automatic1111 API
///

interface SDRequest {
    enable_hr: false,
    denoising_strength: number,
    firstphase_width: number,
    firstphase_height: number,
    prompt: string,
    styles: string[],
    seed: number, // -1
    subseed: number,
    subseed_strength: number,
    seed_resize_from_h: number,
    seed_resize_from_w: number,
    batch_size: number,
    n_iter: number,
    steps: number,
    cfg_scale: number,
    width: number,
    height: number,
    restore_faces: boolean,
    tiling: boolean,
    negative_prompt: string,
    eta: number,
    s_churn: number,
    s_tmax: number,
    s_tmin: number,
    s_noise: number,
    override_settings: {},
    sampler_index: string, // Euler 
}

interface SDResponse {
    images: string[],
    parameters: {
        enable_hr: false,
        denoising_strength: 0,
        firstphase_width: 0,
        firstphase_height: 0,
        prompt: string,
        styles: string[],
        seed: number, // -1
        subseed: -1,
        subseed_strength: number,
        seed_resize_from_h: number,
        seed_resize_from_w: number,
        batch_size: number,
        n_iter: number,
        steps: number,
        cfg_scale: number,
        width: number,
        height: number,
        restore_faces: boolean,
        tiling: boolean,
        negative_prompt: string,
        eta: number,
        s_churn: number,
        s_tmax: number,
        s_tmin: number,
        s_noise: number,
        override_settings: {},
        sampler_index: string, // Euler    
    },
    info: {
        prompt: string,
        all_prompts: string[],
        negative_prompt: string,
        seed: number,
        all_seeds: [],
        subseed: number,
        all_subseeds: [],
        subseed_strength: 0,
        width: 512,
        height: 512,
        sampler_index: 1,
        sampler: "Euler",
        cfg_scale: 7,
        steps: 50,
        batch_size: 1,
        restore_faces: false,
        face_restoration_model: null,
        sd_model_hash: string,
        seed_resize_from_w: number,
        seed_resize_from_h: number,
        denoising_strength: number,
        extra_generation_params: {},
        index_of_first_image: number,
        infotexts: string[],
        styles: string[],
        job_timestamp: number,
        clip_skip: number
    }
}

export type { SDRequest, SDResponse }

export const isSDResponse = (object: any): object is SDResponse => {
    return "images" in object;
} 
