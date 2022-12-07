
require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URL

const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = { mongo };