import { APIEndpointv1 } from "@/config/const";
import IImage from "@/models/IImage";
import { ImageDetailResponse } from "@/types/Image";
import { IRunpodLexica } from "@/types/Responsive";
import { AxiosResponse } from "axios";
// import { toast } from "react-toastify";
import APIAxios from "./APIAxios";
// import { convertLexicaResponseToImageGallery } from "@/utils/helpers";

const ImageService = async (imageId?: string): Promise<IImage> => {

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

    const fetchData = async (imageId?: string) => {
        try {
            const params = {
                id: imageId,
            }
            const res: AxiosResponse = await APIAxios.get<IRunpodLexica>(
                APIEndpointv1.DETAIL_IMAGE,
                { params }
            )

            if (res.status !== 200) {
                console.log("Unable to fetch result from trending API: ", res.status);
                // toast.error("Fetch image detail API: Unable to fetch result");
                return res;
            }
            const data: IImage = convertLexicaResponseToImageGallery(res.data?.result);
            return data;

        } catch (error) {
            // toast.error("Trending API: encounter errors...");
            return error;
        }
    }
    const result: any = await fetchData(imageId);
    return result;

}

export default ImageService;