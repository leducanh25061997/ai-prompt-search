import replicate
import requests

URL_LEXICA = "https://lexica.art/api/v1/search"

# andy
REPLICATE_API_TOKEN = "91c5c25c725eceea6d48f9d21f72b7a79302b7db"

# # vinh
# REPLICATE_API_TOKEN="7858fc9f26b5319835aa3745b717aba8c02d5ccc"

# # nam
# REPLICATE_API_TOKEN="35392e3d1e2fe06a73d275310c0dd77291579f56"

# vudx
# REPLICATE_API_TOKEN="be74f983ae775ade16bc91e6d4dfc4aeffd8772b"

client = replicate.Client(api_token=REPLICATE_API_TOKEN)


def replicate_create_prediction(
    prompt: str,
    model_name: str,
    input_version: str,
    num_outputs: int = 4,
):
    model = client.models.get(model_name)
    version = model.versions.get(input_version)
    prediction = client.predictions.create(
        version=version,
        input={
            "height": 512,
            "width": 512,
            "num_outputs": num_outputs,
            "num_inference_steps": 35,
            "prompt": prompt
        })
    return prediction


def replicate_get_prediction(id: str):
    prediction = client.predictions.get(id=id)
    return prediction


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


def get_style(user_content: str, prompt: str) -> str:
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


def get_open_art_discovery():
    url = "https://openart.ai/api/feed/discovery"
    response = requests.get(url)

    if response.status_code == 200:
        return response


def convert_open_art_to_lexica(response):
    result = {"images": []}

    for res in response['items']:
        _tmp = {
            "id": res['source_id'],
            "gallery": None,
            "src": res['image_url'],
            "srcSmall": None,
            "prompt": res['prompt'],
            "width": res['image_width'],
            "height": res['image_height'],
            "seed": None,
            "grid": False,
            "model": res['ai_model'],
            "guidance": None,
            "promptid": res['source_id'],
            "nsfw": False,
            "style": res['prompt'],
        }
        result["images"].append(_tmp)

    return result
