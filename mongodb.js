const mongodb = require('mongodb');

const { MongoClient } = mongodb;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager-api';

MongoClient.connect(connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('unable to connect to database');
    }

    const db = client.db(databaseName);

    // return db.collection('users').insertOne({
    //   name: 'Andrew',
    //   age: 27,
    // }, (err, result) => {
    //   if (err) {
    //     return console.log('Unable to insert user');
    //   }

    //   return console.log(result.ops);
    // });

    return db.collection('user').insertMany(
      [{ name: 'Andrew', age: 26 }, { name: 'Ken', age: 22 }], (err, result) => {
        if (err) {
          return console.log('Unable to insert documents');
        }

        return console.log(result.ops);
      },
    );
  });
