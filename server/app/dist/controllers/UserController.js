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
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");
const Schema_1 = require("../utils/Schema");
const Helper_1 = require("../utils/Helper");
const Authdb_1 = require("../utils/Authdb");
const Storedb_1 = require("../utils/Storedb");
dotEnv.config();
const logger = Helper_1.Helper.getLoggerInstance();
const auth = new Authdb_1.Authdb(process.env.MYSQLDB_CONNECTION_URL, process.env.MYSQLDB_CONNECTION_USER, process.env.MYSQLDB_CONNECTION_PASS);
const store = new Storedb_1.Storedb(process.env.MYSQLDB_CONNECTION_URL, process.env.MYSQLDB_CONNECTION_USER, process.env.MYSQLDB_CONNECTION_PASS);
class UserController {
    static verifyToken(req, res, next) {
        let token = req.headers['x-access-token'] || null;
        if (token) {
            try {
                let decoded = jwt.verify(token, process.env.JSON_SECRET);
                req['decoded'] = decoded;
                next();
            }
            catch (error) {
                logger.error(error);
                res.status(500).json({ message: error });
            }
        }
        else {
            res.status(403).json({ message: 'No token provided.' });
        }
    }
    static Authenticate(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Schema_1.Schema.authenticate.isValidSync(request.body, { strict: true })) {
                    response.status(400).json({ status: "BAD_REQUEST", message: "wrong body" });
                    return;
                }
                const user = yield auth.get(request.body.email);
                console.log(auth.get(request.body.email), 'users');
                console.log(user + 'users');
                /*if(!user || user.password !== sha256().update(request.body.password).digest("hex")) {
                    response.status(403).json({status: "FORBIDDEN", message: "wrong id or secret"});
                    return;
                }*/
                let token;
                token = jwt.sign({ id: request.body.email }, process.env.JSON_SECRET, { expiresIn: "7d" });
                response.status(200).json({ status: "OK", message: "Succesfully authenticated", token: token });
            }
            catch (error) {
                logger.error(JSON.stringify(error));
                response.status(500).json({ status: "SERVER_ERROR", message: error });
            }
        });
    }
}
exports.UserController = UserController;
