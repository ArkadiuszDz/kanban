const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connetionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'kanban';

MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database');
  }

  console.log('Connected properly.');

  const db = client.db(databaseName);

  // db.collection('to-do').insertMany(
  //   [    
  //     {
  //       name: "Learn C#",
  //       status: "To Do",
  //       description: "I have to learn C# to get a better job."
  //     },
  //     {
  //       name: "Learn Java",
  //       status: "To Do",
  //       description: "I have to learn Java to get a better job."
  //     }
  //   ], (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert data correctly.');
  //     }

  //     console.log(result.ops);
  // });
});