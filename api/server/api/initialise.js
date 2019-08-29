import express from 'express';
import bodyParser from 'body-parser';
import logger from '../common/logger';
import morgan from 'morgan';
import {isDev} from "../environment";
import generateRoutes from "./routes/v1/generate-routes";

// need redis, swagger
// clean all of this up and make into functions, not defined in this function
export default function initialiseServer() {
    const app = express();
    const port = process.env.APP_PORT || 3000;

    app.use(morgan(isDev ? 'dev' : null));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use((req, _, next) => {
        logger.info(`${req.method} request received at ${req.url}`);
        next();
    });
    app.use((_, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
        next()
    });
    app.use('/v1', generateRoutes);

    process.on('uncaughtException', (err) => {
        logger.error(`uncaught exception: ${err}`);
    });

    app.listen(port, () => {
        logger.info(`faceswap API ready to go on port ${port} 👍`);
    });
};