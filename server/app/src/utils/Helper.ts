import { createLogger, format, Logger, transports } from "winston";

export class Helper {
    public static getLoggerInstance(): Logger {
        return createLogger({
            level: "debug",
            format: format.combine(
                format.timestamp(),
                format.simple()
            ),
            transports: [
                new transports.Console()
            ]
        });
    }
}
