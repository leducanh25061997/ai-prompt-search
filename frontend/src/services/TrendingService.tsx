import { APIEndpointv1 } from "@config/const";
import { ILexicaImage, ImagesData, LexicaResponseData } from "@models/LexicaModel";
import APIAxios from "./APIAxios";
// import { toast } from "react-toastify";
import IImage from "@models/IImage";
import { AxiosResponse } from "axios";
import { FilterParams } from "@/types/Filter";

interface IRunpodLexica {
    status_code: number,
    msg: string,
    results: ILexicaImage[]
}

const TrendingService = async (request?: FilterParams): Promise<LexicaResponseData> => {

    const convertLexicaResponseToImageGallery = (data: ImagesData[]) => {
        let image_list: IImage[] = [];
        for (let idx = 0; idx < data.length; idx++) {
            let image: IImage = {
                id: data[idx].id,
                src: data[idx].imageUrl,
                width: data[idx].params.imgH,
                height: data[idx].params.imgW,
                tags: [
                    { value: "Stable Diffusion", title: "Stable Diffusion" },
                ],
                cfg_scale: Number(data[idx].params.cfgScale),
                caption: data[idx].prompt,
                model_name: data[idx].params.model,
                prompt: data[idx].prompt,
                seed: Number(data[idx].params.seed),
                // style: data[idx].style, 
                title: data[idx].title && data[idx].title !== 'N/A' ? data[idx].title : '',
                source: data[idx].source,
            }
            image_list.push(image);
        }
        return image_list;
    };

    const fetchData = async (params?: FilterParams) => {
        try {
            const res: AxiosResponse = await APIAxios.get<IRunpodLexica>(
                APIEndpointv1.DISCOVERY,
                { params: params}
            )

            if (res.status !== 200) {
                console.log("Unable to fetch result from trending API: ", res.status);
                // toast.error("Trending API: Unable to fetch result");
                return res;
            }
            const data: IImage[] = convertLexicaResponseToImageGallery(res.data?.results);
            const _data = {
                data,
                keywordSuggestions: res.data.keywordSuggestions
            }
            return _data;

        } catch (error: any) {
            console.log("Encounter error from trending API: ", error);
            // toast.error("Trending API: encounter errors...");
            return error;
        }
    }

    const result = await fetchData(request);
    return result;
}

export default TrendingService; 
