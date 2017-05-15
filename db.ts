const connectionString:string = 'mongodb://mongoUser:D0omsday@ds141950.mlab.com:41950/codercampsdb';

import * as mongodb from 'mongodb';

export default class Database {
  public static db:mongodb.Db;

  public static connect() {
    return mongodb.MongoClient.connect(connectionString).then((db) => {
      this.db = db;
    }).catch((err) => {
      console.log(err);
    });
  }
}
