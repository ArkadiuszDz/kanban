const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/kanban-board', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
});

const Task = mongoose.model('Task', {
  name: {
    type: String
  },
  status: {
    type: String
  },
  description: {
    type: String
  }
});