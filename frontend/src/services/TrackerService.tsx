import { APIEndpointv1 } from "@/config/const";
import { FilterTrackerParams } from "@/types/Filter";
import { AxiosResponse } from "axios";
// import { toast } from "react-toastify";
import APIAxios from "./APIAxios";

interface IRunpodLexica {
    status_code: number,
    msg: string,
    results: string;
}

const TrackerService = async (request?: FilterTrackerParams): Promise<any> => {
    const fetchData = async (params?: FilterTrackerParams) => {
        try {
            const res: AxiosResponse = await APIAxios.get<IRunpodLexica>(
                APIEndpointv1.TRACKER,
                { params: params}
            );
            if (res.status !== 200) {
                console.log("Unable to fetch result from trending API: ", res.status);
                // toast.error("Tracker API API: Unable to fetch result");
                return res;
            }
            return res.data;
        } catch (error) {
            
        }
    }


    const result = await fetchData(request);
    return result;   
}

export default TrackerService; 