const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;


const connetionURL = 'mongodb://127.0.0.1:27017';
// const databaseName = 'kanban';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3001;



app.get('', (req, res) => {
  res.send('See all kanban or create your own.');
});

app.get('/boards', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }

    const adminDb = client.db(req.params.dbName).admin();
  
    adminDb.listDatabases({ nameOnly: true }, (err, dbs) => {
      const _dbs = dbs.databases.filter(db => {
        return (db.name !== 'admin' && db.name !== 'local' && db.name !== 'config');
      });
      res.send(_dbs);
    });
   
  });
});

app.get('/boards/:dbName/tasks', (req, res) => {
  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);

    const testDb = db.collection('tasks').aggregate([
      {
        $lookup: {
          from: "columns",
          localField: "status",
          foreignField: "_id",
          as: "status"
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "description": 1,
          "comment": 1,
          "status": { $arrayElemAt: ["$status.status", 0] },
          "status_id": { $arrayElemAt: ["$status._id", 0] },
        }
      },
      {
        $group: {
          _id: "$status",
          data: { 
            $push: "$$ROOT"
          }
        }
      },
      {
        $group: {
          _id: null,
          data: {
            "$push": {
              "k": "$_id",
              "v": "$data"
            }
          }
        }
      },
      {
        $replaceRoot: {
          "newRoot": { 
            $arrayToObject: "$data" 
          }
        }
      }
    ]).toArray();

    // testDb.then(item => res.send({
    //   tasks: { ...item[0] }
    // }))

    testDb.then(item => res.send({
       ...item[0] 
    }))
 

  });
});

app.get('/boards/:dbName/tasks/:task', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);

    db.collection('tasks').findOne(
      { _id: ObjectId(req.params.task) }, 
    ).then(task => {
      res.send(task);
    });

  });
});

app.get('/boards/:dbName/columns', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }

    const db = client.db(req.params.dbName);
    
    db.collection('columns').find({}).toArray((err, items) => {
      res.send(items);
    });

  });
});

// create a new kanban board and define all possible columns
app.post('/create-kanban/:dbName', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);
    const adminDb = db.admin();
  
    adminDb.listDatabases((err, dbs) => {
      dbs.databases.forEach(db => {
        if (db.name === req.params.dbName) {
          return res.send('This database name is taken.');
        }
      });
    });
    
    db.collection('columns').insertMany( //collection called columns will store all the possible columns
      [
        ...req.body.columns
      ]
    ).then(() => {
      res.send(req.body);
    });

  });
});

// create a task for specified board and column
app.post('/create-task/:dbName', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);
    db.collection('tasks').insertOne(  
      {
        ...req.body.task,
        status: ObjectId(req.body.task.status) 
      }
    ).then(task => {
      res.send(task);
    });
  });
});

app.post('/update-task/:dbName/:task', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);

    db.collection('tasks').findOneAndUpdate(  
      { _id: ObjectId(req.params.task) },
      { 
        $set: {
          status: ObjectId(req.body.task.status_id),
          description: req.body.task.description,
          comment: req.body.task.comment
        } 
      },
      { returnOriginal: false }
    ).then(task => {
      res.send(task.value);
    });
  });
});


app.listen(port, () => {
  console.log(`Server is up and running on port ${port}.`);
});

