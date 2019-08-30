import express from 'express';
import bodyParser from 'body-parser';
import logger from '../common/logger';
import morgan from 'morgan';
import {isDev} from "../environment";
import generateRoutes from "./routes/v1/generate-routes";

// need redis, swagger
export default function initialiseServer() {
    const app = express();
    const port = process.env.APP_PORT || 3000;

    app.use(morgan(isDev ? 'dev' : null));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(logRequest);
    app.use(setHeaders);
    app.use('/v1', generateRoutes);

    process.on('uncaughtException', logException);

    app.listen(port, () => {
        logger.info(`faceswap API ready to go on port ${port} 👍`);
    });
};

const setHeaders = (_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next()
};

const logRequest = (req, _, next) => {
    logger.info(`${req.method} request received at ${req.url}`);
    next();
};

const logException = (err) => {
    logger.error(`uncaught exception: ${err}`);
};