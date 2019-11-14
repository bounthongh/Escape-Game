"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
class Helper {
    static getLoggerInstance() {
        return winston_1.createLogger({
            level: "debug",
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.simple()),
            transports: [
                new winston_1.transports.Console()
            ]
        });
    }
}
exports.Helper = Helper;
