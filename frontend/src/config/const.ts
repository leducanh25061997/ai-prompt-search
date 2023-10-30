export enum APIDomain {
    PRODUCTION_API = "https://vday.galerie.ai/gateway/",

    // LEXICA_API = "https://lexica.art/api/v1/search?q=",
    LEXICA_API = "https://mlencv.deta.dev/api/lexica/",

    TRENDING_API = "https://mlencv.deta.dev/api/trending/",

    PROD_SD_API = "http://103.186.100.249:8330/sdapi/v1/txt2img",

    RUNPOD_SD_API_SDv15 = "https://5zbcvr94sj08zx-3000.proxy.runpod.net/sdapi/v1/txt2img",
    RUNPOD_SD_API_MJv4 = "https://5zbcvr94sj08zx-3001.proxy.runpod.net/sdapi/v1/txt2img",
    RUNPOD_SD_API_SDv2 = "https://nsl7guf1xxrcsc-3000.proxy.runpod.net/sdapi/v1/txt2img",
    RUNPOD_SD_API_SDv21 = "https://nsl7guf1xxrcsc-3001.proxy.runpod.net/sdapi/v1/txt2img",

    REPLICATE_API_CREATE = "https://mlencv.deta.dev/api/replicate/create",
    REPLICATE_API_GET = "https://mlencv.deta.dev/api/replicate/get"
}

export enum APIEndpointv1 {
    DISCOVERY = "/api/v1/discovery",
    CREATOR_GET = "/api/v1/creator/get",
    CREATOR_CREATE = "/api/v1/creator/create",
    AGGREGATOR = "/api/v1/appregator",
    FAQ = "mediajson/galerie_faq.json",
    SEARCH = 'api/v1/search',
    TRACKER = '/api/v1/tracker',
    SIMILAR_IMAGE = '/api/v1/similar_image',
    DETAIL_IMAGE = '/api/v1/image',
    CUSTOM_IMAGE = '/api/v1/custom_image',
    SEARCH_POPUP_SUGGESTION = '/api/v1/search_popup_suggestion'
}

export enum ProductionModelList {
    // REPLICATE_MODEL = "replicate_model",
    STABLE_DIFFUSION_v15 = "stable-diffusion-v1.5",
    STABLE_DIFFUSION_v20 = "stable-diffusion-v2.0",
    STABLE_DIFFUSION_v21 = "stable-diffusion-v2.1",
    MIDJOURNEY_v4 = "midjourney-v4",
    WAIFU_DIFFUSION = "waifu-diffusion", 
    OPENJOURNEY_v2 = "openjourney-v2",
}

export const MAX_LEXICA_RESULT = 50;

export const MAX_Z_INDEX = 999999;

const ReplicateModelList = {
    "STABLE_DIFFUSION": {
        "model": "stability-ai/stable-diffusion",
        "version": "6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c",
    },
    "OPEN_MIDJOURNEY": {
        "model": "prompthero/openjourney",
        "version": "9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
    },
    "ARCANE_DIFFUSION": {
        "model": "nitrosocke/arcane-diffusion",
        "version": "a8cd5deb8f36f64f267aa7ed57fce5fc7e1761996f0d81eadd43b3ec99949b70",
    },
    "REDSHIFT_DIFFUSION": {
        "model": "nitrosocke/redshift-diffusion",
        "version": "b78a34f0ec6d21d22ae3b10afd52b219cec65f63362e69e81e4dce07a8154ef8",
    },
}

export const ReplicateSDModelList = {
    STABLE_DIFFUSION: ReplicateModelList.STABLE_DIFFUSION,
    OPEN_MIDJOURNEY: ReplicateModelList.OPEN_MIDJOURNEY,

    // inference taking too long (~ 1 minute) 
    REDSHIFT_DIFFUSION: ReplicateModelList.REDSHIFT_DIFFUSION,
    ARCANE_DIFFUSION: ReplicateModelList.ARCANE_DIFFUSION,
}

export const enum ReplicateStatus {
    STARTING = "starting",
    PROCESSING = "processing",
    SUCCEEDED = "succeeded",
    FAILED = "failed",
    CANCELED = "canceled"
}