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


export class UserController {

    public static verifyToken(req: Request, res: Response, next: NextFunction) {
        let token = req.headers['x-access-token'] || null;
        if (token) {
            try {
                let decoded =  jwt.verify(token as string, process.env.JSON_SECRET);
                req['decoded'] = decoded;
                next();
            } catch (error) {
                logger.error(error);
                res.status(500).json({message: error});
            }
        }
        else {
            res.status(403).json({message: 'No token provided.'});
        }
    }

    public static async Authenticate(request: Request, response: Response): Promise<void> {
        try {
            if(!Schema.authenticate.isValidSync(request.body, {strict: true})) {
                response.status(400).json({status: "BAD_REQUEST", message: "wrong body"});
                return;
            }

            const user = await auth.get(request.body.email);
            console.log(auth.get(request.body.email),'users');
            console.log(user + 'users');
            /*if(!user || user.password !== sha256().update(request.body.password).digest("hex")) {
                response.status(403).json({status: "FORBIDDEN", message: "wrong id or secret"});
                return;
            }*/
            let token: string;
            token = jwt.sign({id: request.body.email}, process.env.JSON_SECRET, {expiresIn: "7d"});
            response.status(200).json({status: "OK", message: "Succesfully authenticated", token: token});
        } catch (error) {
            logger.error(JSON.stringify(error));
            response.status(500).json({status: "SERVER_ERROR", message: error});
        }
    }




}
