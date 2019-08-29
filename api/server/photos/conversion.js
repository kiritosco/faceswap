import {base64syntax, errorMessages} from "../common/consts";

const base64ToBuffer = (encoded) => {
    const strippedEncoded = encoded.substring(encoded.indexOf(base64syntax.startOfDataSymbol) + base64syntax.startOfDataSymbol.length);
    return Buffer.from(strippedEncoded, 'base64');
};

export const convertPhotosForSwapping = (photoOne, photoTwo) => {
    if(!photoOne || !photoTwo) {
        throw new Error(errorMessages.invalidPhotos)
    }

    return {
        photoOneBuffer: base64ToBuffer(photoOne),
        photoTwoBuffer: base64ToBuffer(photoTwo)
    }
};