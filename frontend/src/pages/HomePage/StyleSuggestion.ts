import IImage from "@models/IImage";

const removeSpecialCharacters = (str: string): string => {
    // Remove special charcter & replace with space
    return str.replace(/[^a-zA-Z0-9]/g, ' ');
}

const processStyle = (text: string): string => {
    return text.trim().split(' ').slice(0, 5).join(" ");
}

const StyleSuggestion = (imageList: IImage[], maxNumSuggestion: number = 5, useTFIDF: boolean = false): { [key: string]: string } => {
    let styles = new Set();
    let dictionary: { [key: string]: { value: string, image: string } } = {};

    for (let idx = 0; idx < imageList.length; idx++) {
        // Get first 5 words 
        let key: string = (useTFIDF) ? (processStyle(imageList[idx].style ?? "")) : (processStyle(imageList[idx].title ?? ""));
        key = removeSpecialCharacters(key);

        if ((key === "" || key === undefined || styles.has(key)))
            continue

        styles.add(key);
        dictionary[key] = (useTFIDF) 
            ? { value: imageList[idx].style as string, image: imageList[idx].src as string }
            : imageList[idx].title 
                ? { value: imageList[idx].title as string, image: imageList[idx].src as string } 
                : { value: imageList[idx].prompt as string, image: imageList[idx].src as string };  
    };

    // Reverse style suggestion to make randomness   
    return Object.entries(dictionary).reverse()
        .slice(0, maxNumSuggestion)
        .reduce((obj, [key, val]) => ({ ...obj, [key]: { value: val.value, image: val.image } }), {});
}

export default StyleSuggestion
