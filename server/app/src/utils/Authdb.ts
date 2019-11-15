import * as nano from 'nano';
import { sha256 } from 'hash.js';
const mysql = require('mysql');
import { Helper } from '../utils/Helper';

import {Sequelize} from 'sequelize-typescript';
const logger = Helper.getLoggerInstance();


export class Authdb {
    private serverScope: nano.ServerScope;
    private dbName: string;
    private serverConnection: any;

    public constructor(url: string, user: string, password: string) {

        try {

          const sequelize = new Sequelize({
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
          })
        } catch (error) {
            throw error;
        }
    }

    public async get(key: string){
        try {
          let objectUsers;
          const query="select * from users where email='"+key+"'";
          return this.serverConnection.query(query, (err,rows) => {
            if(err) return null;
            const users = JSON.parse(JSON.stringify(rows));
            const object = Object.assign({}, ...users);
            console.log(object);
            return object;
            // return JSON.parse(JSON.stringify(rows));
        });
        } catch (error) {
            return null;
        }
    }
}
