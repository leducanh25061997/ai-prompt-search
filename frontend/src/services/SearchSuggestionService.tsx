import { APIEndpointv1 } from "@/config/const";
import { Results, SearchSuggestionResponse } from "@/types/SearchSuggestion";
import { AxiosResponse } from "axios";
import APIAxios from "./APIAxios";


const SearchSuggestionService = async (userId?: number): Promise<Results> => {

    const fetchData = async (userId?: number) => {
        try {
            const res: AxiosResponse = await APIAxios.get<SearchSuggestionResponse>(
                APIEndpointv1.SEARCH_POPUP_SUGGESTION,
                { params: { user_id: userId || -1} }
            );

            if (res.status !== 200) {
                console.log("Unable to fetch result from trending API: ", res.status);
                return res;
            }

            return res.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const result: Results = await fetchData(userId);

    return result;
}

export default SearchSuggestionService; 