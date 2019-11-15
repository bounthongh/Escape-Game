import * as dotEnv from "dotenv";
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { sha256 } from "hash.js"
import { Request, Response, NextFunction} from "express";
import { Schema } from "../utils/Schema"
import { Helper } from '../utils/Helper';
import { Authdb } from '../utils/Authdb';
import { Storedb } from '../utils/Storedb';
import { User } from "../utils/Interface";

dotEnv.config();

const logger = Helper.getLoggerInstance();

const auth = new Authdb(process.env.MYSQLDB_CONNECTION_URL,
                        process.env.MYSQLDB_CONNECTION_USER,
                        process.env.MYSQLDB_CONNECTION_PASS);
const store = new Storedb(process.env.MYSQLDB_CONNECTION_URL,
                        process.env.MYSQLDB_CONNECTION_USER,
                        process.env.MYSQLDB_CONNECTION_PASS);

export class ClientController {

  public static async addItem(request: Request, response: Response) {
    try {
      // const buyer =
      const itemBuyer =  {
          "Civilite":"Monsieur",
           "Nom":"Carmine",
            "Prenom":"Art",
            "Age":64,
            "Email":"carmine.art@gogole.com"
      }
      const isStored = store.setBuyerdb(itemBuyer);
      console.log(isStored);
      if (isStored === true) {
        response.status(200).json({status: "OK", message: "Succesfully authenticated"});
      }
      else {
        response.status(400).json({status: "BAD_REQUEST", message: "wrong body"});
      }
    } catch (error) {
      logger.error(JSON.stringify(error));
      response.status(400).json({status: "BAD_REQUEST", message: "wrong body"});
    }
  }

}
