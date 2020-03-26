const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const connetionURL = 'mongodb://127.0.0.1:27017';
// const databaseName = 'kanban';

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('', (req, res) => {
  res.send('See all kanban or create your own.');
});

app.get('/kanban', (req, res) => {

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

app.get('/kanban/:dbName', (req, res) => {
  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);
    // show actual kanban board
    // do data mapping on front here
    db.listCollections({}, { nameOnly: true }).toArray().then((collections) => {
      res.send(collections);
    });

  });
});

app.get('/kanban/:dbName/:column/:task', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);

    db.collection(req.params.column).findOne(
      { _id: ObjectId(req.params.task) }, 
    ).then((task) => {
      res.send(task);
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
app.post('/create-task/:dbName/:column', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);
    
    db.collection(req.params.column).insertOne(  
      {
        ...req.body.task,
        status: ObjectId(req.body.task.status) 
      }
    ).then(() => {
      res.send(req.body);
    });
  });
});

app.post('/update-task/:dbName/:column/:task', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);
    
    db.collection(req.params.column).findOneAndUpdate(  
      { _id: ObjectId(req.params.task) },
      { 
        $set: { 
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

app.post('/change-status/:dbName/:column/:task', (req, res) => {

  MongoClient.connect(connetionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }
    const db = client.db(req.params.dbName);
    
    db.collection(req.params.column).findOneAndUpdate(  
      { _id: ObjectId(req.params.task) },
      { 
        $set: { 
          status_id: req.body.task.status,
          status: req.body.task.status
        } 
      },
      { returnOriginal: false }
    ).then(document => {
      const _document = { ...document.value };

      db.collection(req.body.task.status).insertOne(  
        {
          name: _document.name,
          description: _document.description,
          status: _document.status,
          status_id: ObjectId(req.body.task.status_id) 
        }
      ).then(() => {
        db.collection(req.params.column).deleteOne(
          {
            _id: _document._id
          }
        ).then(() => {
          res.send('Status updated.');
        });
       
      });
    });
  });
});

app.listen(port, () => {
  console.log('Server is up and running on port 3000.');
});

