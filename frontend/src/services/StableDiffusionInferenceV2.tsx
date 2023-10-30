/// 
// This Stable Diffusion Models is use for Automatic1111 API
///

import { SDRequest, SDResponse } from "@models/StableDiffusionModel";
import APIAxios from "./APIAxios";
import IImage from "@models/IImage";

export const convertSDResponseToImageGallery = (data: SDResponse, custom_tags?: string): any[] => {
    let image_list: IImage[] = [];
    for (let idx = 0; idx < data.images.length; idx++) {
        let image: IImage = {
            src: "data:image/jpeg;base64," + data.images[idx],
            width: 512,
            height: 512,
            tags: [
                {
                    value: custom_tags ? custom_tags : "Stable Diffusion",
                    title: custom_tags ? custom_tags : "Stable Diffusion"
                },
            ],
            prompt: data.info.prompt,
            cfg_scale: data.info.cfg_scale,
            seed: data.info.seed,
            model_name: custom_tags ? custom_tags : "N/A"
        }
        image_list.push(image);
    }
    return image_list;
};

const SDInferenceServiceV2 = (
    prompt: string,
    target_domain: string,
    numOutput: number = 4,
    custom_tags?: string,
): any => {
    const request_data: SDRequest = {
        enable_hr: false,
        denoising_strength: 0,
        firstphase_width: 0,
        firstphase_height: 0,
        prompt: prompt,
        styles: [],
        seed: -1,
        subseed: -1,
        subseed_strength: 0,
        seed_resize_from_h: -1,
        seed_resize_from_w: -1,
        batch_size: numOutput,
        n_iter: 1,
        steps: 50,
        cfg_scale: 7,
        width: 512,
        height: 512,
        restore_faces: false,
        tiling: false,
        negative_prompt: "",
        eta: 0,
        s_churn: 0,
        s_tmax: 0,
        s_tmin: 0,
        s_noise: 1,
        override_settings: {},
        sampler_index: "DDIM" // Euler not working with SD v2.1
    };
    
    return APIAxios.post<SDResponse>(
        target_domain,
        request_data,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        },
    );
}

export default SDInferenceServiceV2; 
