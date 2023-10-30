import { APIEndpointv1 } from "@/config/const";
import IImage from "@/models/IImage";
import { FilterParams } from "@/types/Filter";
import { ImageDetailResponse } from "@/types/Image";
import { AxiosResponse } from "axios";
// import { toast } from "react-toastify";
import APIAxios from "./APIAxios";

interface IRunpodLexica {
    status_code: number,
    msg: string,
    results: string;
}

const CustomImagService = async (param?: FilterParams): Promise<IImage> => {
    const convertLexicaResponseToImageGallery = (data: ImageDetailResponse) => {
        let image: IImage = {
            id: data.id.toString(),
            src: data.imageUrl,
            width: data.params.width,
            height: data.params.height,
            tags: [
                { value: "Stable Diffusion", title: "Stable Diffusion" },
            ],
            // cfg_scale: Number(data.params.cfgScale),
            caption: data.prompt,
            // model_name: data.params.model,
            prompt: data.prompt,
            // seed: Number(data.params.seed),
            // style: data[idx].style, 
            title: data.title && data.title !== 'N/A' ? data.title : '',
            source: data.source,
        };
        return image;
    };

    const fetchData = async (request?: FilterParams) => {
        try {
            const res: AxiosResponse = await APIAxios.post<IRunpodLexica>(
                APIEndpointv1.CUSTOM_IMAGE,
                {
                    user_id: -1,
                    ...request,
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
            if (res.status !== 200) {
                console.log("Unable to fetch result from Lexica: ", res.status);
                // toast.error("Lexica API: Unable to fetch result");
                return res;
            }
            const data: IImage = convertLexicaResponseToImageGallery(res.data?.result);
            return data;
        } catch (error) {
            // toast.error("Fetch Size Image: Encounter errors...");
            return error;
        }
    }
    const result: any = await fetchData(param);
    return result;
};

export default CustomImagService;