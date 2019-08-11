import express from 'express';
import logger from "../common/logger";

export default function initialiseServer() {
    const app = express();
    const port = process.env.APP_PORT || 3000;

    app.get('/', (req, res) => res.send('Hello World!'));

    app.listen(port, () => logger.info(`Example app listening on port ${port}!`));
};