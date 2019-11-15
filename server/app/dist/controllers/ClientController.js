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
const Helper_1 = require("../utils/Helper");
const Authdb_1 = require("../utils/Authdb");
const Storedb_1 = require("../utils/Storedb");
dotEnv.config();
const logger = Helper_1.Helper.getLoggerInstance();
const auth = new Authdb_1.Authdb(process.env.MYSQLDB_CONNECTION_URL, process.env.MYSQLDB_CONNECTION_USER, process.env.MYSQLDB_CONNECTION_PASS);
const store = new Storedb_1.Storedb(process.env.MYSQLDB_CONNECTION_URL, process.env.MYSQLDB_CONNECTION_USER, process.env.MYSQLDB_CONNECTION_PASS);
class ClientController {
    static addItem(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const buyer =
                const itemBuyer = {
                    "Civilite": "Monsieur",
                    "Nom": "Carmine",
                    "Prenom": "Art",
                    "Age": 64,
                    "Email": "carmine.art@gogole.com"
                };
                const isStored = store.setBuyerdb(itemBuyer);
                console.log(isStored);
                if (isStored === true) {
                    response.status(200).json({ status: "OK", message: "Succesfully authenticated" });
                }
                else {
                    response.status(400).json({ status: "BAD_REQUEST", message: "wrong body" });
                }
            }
            catch (error) {
                logger.error(JSON.stringify(error));
                response.status(400).json({ status: "BAD_REQUEST", message: "wrong body" });
            }
        });
    }
}
exports.ClientController = ClientController;
