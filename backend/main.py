import requests
import math
from typing import Union, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from utils import *

URL_LEXICA = "https://lexica.art/api/v1/search"


def get_style(user_content, prompt):
    prompt = prompt.lower()
    user_content = user_content.lower()

    prompt = prompt.split(",")

    keep = []
    for idx, seq in enumerate(prompt):
        flag = True
        for content in user_content.split():
            if content in seq.split():
                flag = False
        if flag:
            if not idx in keep:
                keep.append(idx)

    style_prompt = [prompt[i] for i in keep]
    return ''.join(style_prompt)


class TFIDF():
    def __init__(self):
        pass

    def tf(self, term, doc):
        result = 0
        for word in doc:
            if word == term:
                result += 1
        return result / len(doc)

    def idf(self, term, docs):
        result = 0
        for doc in docs:
            for word in doc:
                if word == term:
                    result += 1
                    break

        if result == 0:
            return 0
        return math.log(len(docs) / result, math.e)

    def __call__(self, term, doc, docs):
        return self.tf(term, doc) * self.idf(term, docs)


def get_api_lexica(prompt: str):

    response = requests.get(f'{URL_LEXICA}?q={prompt}')
    status_code = response.status_code

    results = response.json()
    results = results["images"]

    '''
    Sample:
        {
            "id": "0482ee68-0368-4eca-8846-5930db866b33",
            "gallery": "https://lexica.art?q=0482ee68-0368-4eca-8846-5930db866b33",
            "src": "https://image.lexica.art/md/0482ee68-0368-4eca-8846-5930db866b33",
            "srcSmall": "https://image.lexica.art/sm/0482ee68-0368-4eca-8846-5930db866b33",
            "prompt": "cute chubby blue fruits icons for mobile game ui",
            "width": 512,
            "height": 512,
            "seed": "1413536227",
            "grid": false,
            "model": "stable-diffusion",
            "guidance": 7,
            "promptid": "d9868972-dad8-477d-8e5a-4a0ae1e9b72b"
            "nsfw": false,
        }
    '''
    if status_code == 200:
        prompts = []
        for idx, result in enumerate(results):
            prompts.append((idx, result["prompt"]))

        return results, prompts

    return None


def get_style_and_prompt(k: int = 10, prompt_input: str = "the girl"):
    results_respone, prompts = get_api_lexica(prompt=prompt_input)

    styles = [(p[0], get_style(prompt_input, p[1])) for p in prompts]
    style_prompts = [(p[0], p[1].split()) for p in styles]

    tfidf = TFIDF()
    tfidf_prompt = []
    ids = [p[0] for p in style_prompts]
    docs_prompts = [p[1] for p in style_prompts]

    for idx, prompt in zip(ids, docs_prompts):
        score = 0
        for word in prompt:
            score += tfidf(word, prompt, docs_prompts)
        # (id, score, prompt)
        tfidf_prompt.append((idx, score, ' '.join(prompt)))

    tfidf_prompt = sorted(tfidf_prompt, key=lambda x: x[0], reverse=True)
    topk_prompt = tfidf_prompt[:k]
    topk_result_prompt = [results_respone[p[0]] for p in topk_prompt]

    results = []
    for x, y in zip(topk_prompt, topk_result_prompt):
        y["style"] = x[-1]
        results.append(y)

    return results


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/replicate/create")
def replicate_create_endpoint(
    prompt: Union[str, None] = None,
    num_outputs: Optional[int] = 4,  # 1 or 4
    model_name: Optional[str] = "stability-ai/stable-diffusion",
    version: Optional[str] = "6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c",
):
    return replicate_create_prediction(
        prompt=prompt,
        model_name=model_name,
        input_version=version,
        num_outputs=num_outputs
    )


@app.get("/api/replicate/get")
def replicate_get_endpoint(id: str):
    return replicate_get_prediction(id)


@app.get("/api/lexica/")
def lexica_func(k: int, prompt: Union[str, None] = None):
    return get_style_and_prompt(k, prompt)


@app.get("/api/trending/")
def trending_endpoint():
    url = "https://openart.ai/api/feed/discovery"
    result_response = requests.get(url)

    # TODO: feed to TF-IDF
    if result_response.status_code != 200:
        return

    return convert_open_art_to_lexica(result_response.json())

if __name__ == "__main__":
    uvicorn.run(
        app=app,
        host="0.0.0.0",
        port=3008
    )
