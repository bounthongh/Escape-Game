"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helper_1 = require("./Helper");
const logger = Helper_1.Helper.getLoggerInstance();
class Storedb {
    constructor(url, user, password) {
        try {
            /*this.sequelize = new Sequelize({
             database: 'toto',
             dialect: 'postgres',
             username: user,
             password: password,
             host: url,
             port: 5432
            });
    
            this.sequelize.authenticate().then(() => {
             console.log("Connected to DB stored");
            })
            .catch((err) => {
             console.log(err);
           })*/
            this.db = require('knex')({
                client: 'pg',
                connection: {
                    host: url,
                    user: user,
                    password: password,
                    database: 'toto'
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    /*public setdb(item){
      try {

      this.db.select('*').from('role')
    .then(items => {
      if(items.length){
        console.log(items)
      } else {
        console.log('eeeeeeee')
      }
    })
    .catch(err => console.log(err))
  } catch (e) {
    console.log(e)
  }
}*/
    setBuyerdb(item) {
        try {
            console.log(item);
            const buyer_name = item.Nom;
            const buyer_email = item.Email;
            return this.db('buyer').insert({ buyer_name, buyer_email })
                .returning('*')
                .then(items => {
                console.log(items);
                return true;
            })
                .catch(err => {
                console.log(err);
                return false;
            });
        }
        catch (e) {
            return false;
        }
    }
}
exports.Storedb = Storedb;
