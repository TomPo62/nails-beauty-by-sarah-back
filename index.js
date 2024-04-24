require('dotenv').config();
const serverless = require('serverless-http');
const app = require('./server');

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return serverless(app)(event, context);
};
