import { APIEndpointv1 } from "@/config/const";
import IImage from "@/models/IImage";
import { ILexicaImage } from "@/models/LexicaModel";
import { convertLexicaResponseToImageGallery } from "@/utils/helpers";
import { AxiosResponse } from "axios";
// import { toast } from "react-toastify";
import APIAxios from "./APIAxios";

interface IRunpodLexica {
    status_code: number,
    msg: string,
    results: ILexicaImage[]
}

const SimilarImageService = async (resultId?: string): Promise<IImage[]> => {
    const fetchData = async (resultId?: string) => {
        try {
            const params = {
                result_id: resultId,
            }
            const res: AxiosResponse = await APIAxios.get<IRunpodLexica>(
                APIEndpointv1.SIMILAR_IMAGE,
                { params }
            )
    
            if (res.status !== 200) {
                console.log("Unable to fetch result from trending API: ", res.status);
                // toast.error("Fetch image detail API: Unable to fetch result");
                return res;
            }
            const data: IImage[] = convertLexicaResponseToImageGallery(res.data?.result?.imageData);
            return data;
        } catch (error) {
            // toast.error("Trending API: encounter errors...");
            return error;
        }
        
    }

    const result: any = await fetchData(resultId);
    return result;
}

export default SimilarImageService;