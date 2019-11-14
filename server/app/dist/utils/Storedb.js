"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helper_1 = require("./Helper");
const sequelize_typescript_1 = require("sequelize-typescript");
const logger = Helper_1.Helper.getLoggerInstance();
class Storedb {
    constructor(url, user, password) {
        try {
            const sequelize = new sequelize_typescript_1.Sequelize({
                database: 'toto',
                dialect: 'postgres',
                username: user,
                password: password,
                host: url,
                port: 5432
            });
            sequelize.authenticate().then(() => {
                console.log("Connected to DB stored");
            })
                .catch((err) => {
                console.log(err);
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.Storedb = Storedb;
