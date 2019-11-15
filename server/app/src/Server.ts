import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotEnv from 'dotenv';
import * as cors from "cors";
import { Helper } from "./utils/Helper";
import { ApiRouter } from "./Router";
import * as fs from 'fs';
import * as YAML from 'yaml';
import * as fileUpload from "express-fileupload";

dotEnv.config();

const app: express.Application = express();

const logger = Helper.getLoggerInstance();

app.use(cors());

app.use(bodyParser.json({
    limit: '20mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb'
}));

app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024,
        files: 1
    },
    useTempFiles : true,
    tempFileDir : '/tmp/',
    abortOnLimit: true
}));

app.use("/api", ApiRouter);

app.listen(process.env.PORT, async () => {
    logger.info("App is running on port: " + process.env.PORT);
});
