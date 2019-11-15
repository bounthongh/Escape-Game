import * as nano from 'nano';
import { Helper } from './Helper';
import { Sequelize } from 'sequelize-typescript';


const logger = Helper.getLoggerInstance();

export class Storedb {
  public scope: nano.ServerScope;
  public url: string;
  public memberDbName: string;
  public db;

  public constructor(url: string, user: string, password: string) {
    try {


      this.db = require('knex')({
        client: 'pg',
        connection: {
          host : url,
          user : user,
          password : password,
          database : 'toto'
        }
      });
    } catch (error) {
      throw error;
    }
  }

  public setBuyerdb(item){
    try {
      console.log(item)
      const buyer_name = item.Nom;
      const buyer_email = item.Email;
      return this.db('buyer').insert({buyer_name,buyer_email})
      .returning('*')
      .then(items => {
        console.log(items);
        return true
      })
      .catch(err => {
        console.log(err);
        return false;
      })
    } catch (e) {
      return false;
    }
  }

}
