const port = process.env.PORT || 5050;

const mongoose = require('mongoose');
const bluebird = require('bluebird');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'KTodoApp server'
  });
});

app.use('/api/v1', require('./api'));

const startServer = () => {
  app.listen(port);
  console.log(`Server is up at port http://localhost:${port}`);
};

const connectDb = () => {
  mongoose.Promise = bluebird;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.connect('mongodb://localhost/ktodoapp', options);
  return mongoose.connection;
};

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);

module.exports = app;