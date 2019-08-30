import cv from "opencv4nodejs";
import Jimp from "jimp";
import {errorMessages, photoDimensions} from "../common/consts";

export const swapFaces = (photoOneBuffer, photoTwoBuffer) => {
    return new Promise(async (resolve, reject) => {
        const {openCvPhotoOne, openCvPhotoTwo} = getOpenCvPhoto(photoOneBuffer, photoTwoBuffer);
        const {imageOneFaceRect, imageTwoFaceBuffer} = getFaceDescriptors(openCvPhotoOne, openCvPhotoTwo);

        if(!imageOneFaceRect || !imageTwoFaceBuffer) {
            reject(new Error(errorMessages.numFaces))
        }

        const swapResult = await mergePhotos(photoOneBuffer, imageTwoFaceBuffer, imageOneFaceRect);
        swapResult.getBase64(Jimp.MIME_JPEG, (err, res) => {
            if(err) {
                reject(err)
            }
            resolve(res)
        })
    })
};

const mergePhotos = async (photoOneBuffer, imageTwoFaceBuffer, imageOneFaceRect) => {
    return new Promise(async (resolve) => {
        const {jimpPhotoOne, jimpPhotoTwo} = await getJimpPhotos(photoOneBuffer, imageTwoFaceBuffer);
        const mergedPhoto = jimpPhotoOne.composite(jimpPhotoTwo, imageOneFaceRect.x, imageOneFaceRect.y);
        const resizedMerge = mergedPhoto.resize(photoDimensions.width, photoDimensions.height);
        resolve(resizedMerge)
    })
};

const getJimpPhotos = async (photoOneBuffer, photoTwoBuffer) => {
    return {
        jimpPhotoOne: await Jimp.read(photoOneBuffer),
        jimpPhotoTwo: await Jimp.read(photoTwoBuffer)
    }
};

const getOpenCvPhoto = (photoOneBuffer, photoTwoBuffer) => {
    return {
        openCvPhotoOne: cv.imdecode(photoOneBuffer),
        openCvPhotoTwo: cv.imdecode(photoTwoBuffer)
    }
};

const getFaceDescriptors = (photoOne, photoTwo) => {
    const classifier = new cv.CascadeClassifier(
        cv.HAAR_FRONTALFACE_DEFAULT
    );

    const imageOneFaceRect = classifier.detectMultiScale(photoOne.bgrToGray()).objects[0];
    const imageTwoFaceRegion = photoTwo.getRegion(classifier.detectMultiScale(photoTwo.bgrToGray()).objects[0]);
    const resizedImageTwoFace = imageTwoFaceRegion.resize(imageOneFaceRect.width, imageOneFaceRect.height);
    const encodedImageTwoFace = cv.imencode('.jpg', resizedImageTwoFace).toString('base64');
    const imageTwoFaceBuffer = Buffer.from(encodedImageTwoFace, 'base64');

    return {
        imageOneFaceRect,
        imageTwoFaceBuffer
    }
};