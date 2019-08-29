import express from 'express';
import logger from "../../../common/logger";
import {sendError, sendSuccess} from "../../common/response";
import {requestBodyKeys} from "../../../common/consts";
import {swapFaces} from "../../../photos/swapping";
import {convertPhotosForSwapping} from "../../../photos/conversion";

const generateRoutes = () => {
    const app = express();

    app.post('/swap', (req, res) => {
        try {
            const {photoOneBuffer, photoTwoBuffer} = convertPhotosForSwapping(req.body[requestBodyKeys.photoOne], req.body[requestBodyKeys.photoTwo]);
            swapFaces(photoOneBuffer, photoTwoBuffer)
                .then(image => {
                    sendSuccess(res, image);
                })
                .catch(err => {
                    const msg = err.message;
                    logger.warn(msg);
                    sendError(res, msg, 400)
                })
        } catch (err) {
            const msg = err.message;
            logger.warn(msg);
            sendError(res, msg, 400)
        }
    });

    return app;
};

export default generateRoutes();