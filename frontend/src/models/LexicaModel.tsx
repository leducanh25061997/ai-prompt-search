interface ILexicaImage {
    number_of_search: number;
    is_relevant: boolean;
    do_create: boolean;
    result_size: number;
    keyword_suggestions: string[];
    filters: string[];
    imageData: [ImagesData];
    // id: string,
    // imagesUrl: string,
    // modelName: string;
    // params: ParamsType;
    // title: string;

    // gallery: string,
    // srcSmall: string,
    // prompt: string,
    // width: number,
    // height: number,
    // seed: string,
    // grid: boolean,
    // model: string,
    // guidance: string,
    // promptid: string,
    // nsfw: string, 
    // style?: string 
    // title?: string 
    // src?: string;
}

interface ImagesData {
    id: string;
    source: string;
    title: string;
    imageUrl: string;
    prompt: string;
    params: ParamsType;
    promptContent: string;
}
interface ParamsType {
    autoEnhance: boolean;
    cfgScale: number;
    imgH: number;
    imgW: number;
    negativePrompt?: string;
    nsfw: boolean;
    numberOfResult: number;
    prompt: string;
    samplerName: string;
    seed: number;
    steps: number;
    model: string;

}

interface LexicaRequest { 
    k: number, // Top K 
    prompt: string
}

interface LexicaResponse {
    error?: boolean, 
    message?: string, 
    // data: ILexicaImage[]
    data: LexicaResponseData
}

interface LexicaResponseData {
    data: ILexicaImage[],
    keywordSuggestions: string[];
}
interface KeywordSuggestions {
    count: number;
    facet: string;
}

export type { ILexicaImage, LexicaResponse, LexicaRequest, ImagesData, KeywordSuggestions, LexicaResponseData }


export const isLexicaResponse = (object: any): object is LexicaResponse => {
    return "id" in object;
} 

