import { ReplicateSDRequest, ReplicateSDResponse } from "@models/ReplicateModel";
// import { toast } from "react-toastify";
import IImage from "@models/IImage";
import { APIDomain, ReplicateStatus } from "../config/const";
import APIAxios from "./APIAxios";
import delay from "delay";

const ReplicateInferenceService = async (
    prompt: string,
    modelName?: string,
    version?: string,
    numOutputs: number = 4,
    toastOutput?: string,
    customTags?: string,
    isEnableToast: boolean = true
): Promise<IImage[] | ReplicateSDResponse> => {

    const convertReplicateResponseToImageGallery = (data: ReplicateSDResponse, custom_tags?: string): any[] => {
        let image_list: IImage[] = [];
        if (data.output === null) return image_list;

        for (let idx = 0; idx < data.output.length; idx++) {
            let image: IImage = {
                src: data.output[idx],
                width: 512,
                height: 512,
                tags: [
                    {
                        value: custom_tags ? custom_tags : "Stable Diffusion",
                        title: custom_tags ? custom_tags : "Stable Diffusion"
                    },
                ],
                prompt: data.input?.prompt,
                cfg_scale: data.input?.guidance_scale,
                seed: data.input?.seed,
                model_name: custom_tags ? custom_tags : "N/A"
            }
            image_list.push(image);
        }
        return image_list;
    };

    const fetchData = async (req: ReplicateSDRequest) => {
        try {
            // Init inference session
            let res = await APIAxios.get<ReplicateSDResponse>(
                APIDomain.REPLICATE_API_CREATE,
                { params: req });

            if (res.data.status === ReplicateStatus.FAILED
                || res.data.status === ReplicateStatus.CANCELED) {
                return res;
            }

            // it will take some time to starting up 
            // so wait a little bit 
            await delay(800);

            // Retry to get inference result
            // Inference result often take about 3 to 4 seconds 
            const sessionID = res.data.id;
            while (res.data.status === ReplicateStatus.PROCESSING
                || res.data.status === ReplicateStatus.STARTING) {
                res = await APIAxios.get<ReplicateSDResponse>(
                    APIDomain.REPLICATE_API_GET, {
                    params: { id: sessionID }
                });

                await delay(1500);
            }

            const data: any[] = convertReplicateResponseToImageGallery(res.data, customTags);

            // Set toast notify 
            // isEnableToast && toast.success(
            //     toastOutput
            //         ? toastOutput
            //         : "Stable Diffusion API Sucess");

            return data;

        } catch (error: any) {
            console.log("Encounter error: ", error);
            // isEnableToast && toast.error("Replicate API: Encounter others error...");
            return error;
        }
    }

    let reqData: ReplicateSDRequest = { prompt: prompt }
    modelName && (reqData.model_name = modelName)
    version && (reqData.version = version)
    numOutputs && (reqData.num_outputs = numOutputs)

    const result = await fetchData(reqData);
    return result;

}

export default ReplicateInferenceService; 
