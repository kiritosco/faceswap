import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs'
import morgan from 'morgan';
import logger from '../common/logger';
import {isDev} from "../common/environment";
import generateRoutes from "./routes/v1/generate-routes";
import path from "path";

export default function initialiseServer() {
    const app = express();
    const port = process.env.APP_PORT || 3000;

    app.use(morgan(isDev ? 'dev' : null));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(logRequest);
    app.use(setHeaders);
    app.use('/v1', generateRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.load(path.join(__dirname, '..', 'swagger.yaml'))));

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