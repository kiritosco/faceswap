import express from 'express';
import logger from '../common/logger';
import morgan from 'morgan';
import {isDev} from "../environment";

// need (redis, morgan logging, error handling), use the routes in generate-routes.js

export default function initialiseServer() {
    const app = express();
    const port = process.env.APP_PORT || 3000;

    app.use(morgan(isDev ? 'dev' : null));

    app.get('/', (req, res) => res.send('Hello World!'));

    app.listen(port, () => logger.info(`faceswap API started on port ${port}!`));
};