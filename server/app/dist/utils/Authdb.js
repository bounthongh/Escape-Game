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
const mysql = require('mysql');
const Helper_1 = require("../utils/Helper");
const sequelize_typescript_1 = require("sequelize-typescript");
const logger = Helper_1.Helper.getLoggerInstance();
class Authdb {
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
                console.log("Connected to DB");
            })
                .catch((err) => {
                console.log(err);
            });
        }
        catch (error) {
            throw error;
        }
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let objectUsers;
                const query = "select * from users where email='" + key + "'";
                return this.serverConnection.query(query, (err, rows) => {
                    if (err)
                        return null;
                    const users = JSON.parse(JSON.stringify(rows));
                    const object = Object.assign({}, ...users);
                    console.log(object);
                    return object;
                    // return JSON.parse(JSON.stringify(rows));
                });
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.Authdb = Authdb;
