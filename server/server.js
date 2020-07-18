const express = require('express');
const models = require('./models');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const expressGraphQL = require('express-graphql');

const app = express();

// Replace with your mongoAtlas URI
const MONGO_URI = 'mongodb+srv://dharmabumzee:vf5xaHGlNflczORN@cluster0.zq4rf.mongodb.net/LYRICAL-GRAPHQL?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoAtlas URI');
}

mongoose.Promise = global.Promise;
mongoose
.connect(MONGO_URI, {
  useNewUrlParser: true
})
.then(() => console.log('Connected to MongoDB instance.'))
.catch(error =>
  console.log('Error connecting to MongoDB:', `${error.message}`)
  );
  app.use(bodyParser.json());
  app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
    notifyOnNetworkStatusChange: true
  }));
  
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
  
  module.exports = app;
  