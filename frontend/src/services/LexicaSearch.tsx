import { APIEndpointv1, MAX_LEXICA_RESULT } from "@config/const";
import { ILexicaImage, ImagesData, LexicaResponse } from "@models/LexicaModel";
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

const LexicaSearchService = async (prompt: FilterParams, top_k: number = MAX_LEXICA_RESULT): Promise<IImage[] | LexicaResponse> => {

    const convertLexicaResponseToImageGallery = (data: ImagesData[]) => {
        let image_list: IImage[] = [];
        for (let idx = 0; idx < data.length; idx++) {
            let image: IImage = {
                id: data[idx].id,
                src: data[idx].imageUrl,
                width: data[idx].params.imgW,
                height: data[idx].params.imgH,
                tags: [
                    { value: "Stable Diffusion", title: "Stable Diffusion" },
                ],
                cfg_scale: Number(data[idx].params.cfgScale),
                caption: data[idx].prompt,
                // model_name: data[idx].model,
                prompt: data[idx].prompt,
                seed: Number(data[idx].params.seed),
                source: data[idx].source,
                title: data[idx].title && data[idx].title !== 'N/A' ? data[idx].title : '',
            }
            image_list.push(image);
        }
        return image_list;
    };

    const fetchData = async (prompt: FilterParams) => {
        try {
            const res: AxiosResponse = await APIAxios.post<IRunpodLexica>(
                APIEndpointv1.SEARCH,
                {
                    ...prompt,
                    user_id: -1
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
            const data: IImage[] = convertLexicaResponseToImageGallery(res.data.results.imageData);
            const _data = {
                data,
                isRelevant: res.data.results.isRelevant,
                keywordSuggestions: res.data.results.keywordSuggestions,
                filters: res.data.results.filters
            }
            return _data;

        } catch (error: any) {
            console.log("Encounter error from Lexica: ", error);
            // toast.error("Stable Diffusion: Encounter errors...");
            return error;
        }
    }

    const result = await fetchData(prompt);
    if (!result.code) {
        return result;
    } else {
        return [];
    }
}

export default LexicaSearchService; 
