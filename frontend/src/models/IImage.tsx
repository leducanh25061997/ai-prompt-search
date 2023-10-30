interface IImage {
    id?: string,
    inferenceId?: string,
    caption?: string,
    src?: string,
    width?: number,
    height?: number,
    tags?: any
    model_name?: string,
    prompt?: string,
    cfg_scale?: number,
    seed?: number,
    style?: string,
    title?: string,
    source?: string, // TODO: Backend should return this field
}

export default IImage; 

export const isIImage = (object: any): object is IImage => {
    return ("height" in object && "width" in object);
}
