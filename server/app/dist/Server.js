"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const cors = require("cors");
const Helper_1 = require("./utils/Helper");
const Router_1 = require("./Router");
const fileUpload = require("express-fileupload");
dotEnv.config();
const app = express();
const logger = Helper_1.Helper.getLoggerInstance();
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
    useTempFiles: true,
    tempFileDir: '/tmp/',
    abortOnLimit: true
}));
app.use("/api", Router_1.ApiRouter);
app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("App is running on port: " + process.env.PORT);
}));
