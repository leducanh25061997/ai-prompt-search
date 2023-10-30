/// 
// Copy from StableDiffusionInference V2  
///
import delay from "delay";
import APIAxios from "./APIAxios";
import IImage from "@models/IImage";
import { APIEndpointv1, ProductionModelList } from "@/config/const";

interface RundPodResponseCREATE {
    statusCode: number,
    msg: string,
    inferenceId: string
}

interface RundPodResponseGET {
    statusCode: number,
    msg: string,
    content: {
        images: string[],
        status: string,
        prompt: string,
        imgH: number,
        imgW: number,
        steps: number,
        number_of_result: number,
        auto_enhance: boolean,
        nsfw: boolean,
        cfg_scale: number,
        negative_prompt: string,
        sampler_name: string,
        seed: number,
        title: string
    }

}


const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCreator = async (inferenceId: string) => {
    try {
        const response = await APIAxios.post<RundPodResponseGET>(
            APIEndpointv1.CREATOR_GET,
            { inference_id: inferenceId, },
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


// Sample Response 
// {
//   "status_code": 200,
//   "msg": "succeeded",
//   "content": {
//     "id": "infer_2",
//     "status": "succeeded",
//     "results": {
//       "images": [
//         "http://103.186.100.203:9000/prompt-search-results/infer_2-0.jpg"
//         "http://103.186.100.203:9000/prompt-search-results/infer_2-0.jpg"
//         "http://103.186.100.203:9000/prompt-search-results/infer_2-0.jpg"
//       ],
//       "params": {
//         "prompt": "cat",
//         "imgH": 512,
//         "imgW": 512,
//         "steps": 30,
//         "number_of_result": 1,
//         "auto_enhance": false,
//         "nsfw": true,
//         "cfg_scale": 7.5,
//         "negative_prompt": "",
//         "sampler_name": "Euler",
//         "seed": -1,
//         "title": "Cat"
//       }
//     }
//   }
// }



export const convertRunPodDiffusionToImageGallery = (data: any, custom_tags?: string): IImage[] => {
    let image_list: IImage[] = [];
    if (data?.results?.images?.length) {
        for (let idx = 0; idx < data.results.images.length; idx++) {
            let image: IImage = {
                id:  data.results.images[idx],
                src: data.results.images[idx],
                width: data.results.params.imgW,
                height: data.results.params.imgH,
                tags: [
                    {
                        value: custom_tags ? custom_tags : "Stable Diffusion",
                        title: custom_tags ? custom_tags : "Stable Diffusion"
                    },
                ],
                prompt: data.results.params.prompt,
                cfg_scale: data.results.params.cfgScale,
                seed: data.results.params.seed,
                model_name: custom_tags ? custom_tags : "N/A"
            }
            image_list.push(image);
        }
    }
    return image_list;
};

const RunPodDiffusionService = async (
    prompt: string,
    nsfw: boolean = true,
    auto_enhance: boolean = false,
    numOutput: number = 1,
    modelName: string = ProductionModelList.STABLE_DIFFUSION_v15,
    customTags: string = ""
    // customTags: string = ProductionModelList.STABLE_DIFFUSION_v15 
): Promise<any> => {
    const request_data = {
        model_name: modelName,
        user_id: getRandomInt(1, 10000),
        params: {
            prompt: prompt,
            imgH: 512,
            imgW: 512,
            steps: ProductionModelList.STABLE_DIFFUSION_v21 ? 50 : 30,
            number_of_result: numOutput,
            auto_enhance: auto_enhance,
            nsfw: nsfw,
            cfg_scale: 7.5,
            negative_prompt: "",
            sampler_name: ProductionModelList.STABLE_DIFFUSION_v21 ? "DDIM" : "Euler",
            seed: -1
        }
    };
    try {
        let init_res = await APIAxios.post<RundPodResponseCREATE>(
            APIEndpointv1.CREATOR_CREATE,
            request_data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            },
        ).then(response => {
            return response;
        });

        if (init_res.status !== 200)
            return init_res;

        // it will take some time to starting up 
        // so wait a little bit 
        const sessionID = init_res.data.inferenceId;
        let res = await getCreator(sessionID);

        await delay(3000);

        const maxRetry = 30; 
        let retry = 0; 
        while (res?.content.status === "processing") {
            res = await getCreator(sessionID);
            await delay(3000);

            if (retry >= maxRetry) break; 
            retry++; 
        }
        const data: any[] = convertRunPodDiffusionToImageGallery(res?.content, customTags !== "" ? customTags : modelName);
        return data;
    } catch (error: any) {
        console.log("Encounter error: ", error);
        return error;
    }

}

export default RunPodDiffusionService; 
