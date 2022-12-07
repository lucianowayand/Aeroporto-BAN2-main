
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ban2-aeroporto:ban2-aeroporto@cluster0.5sraioc.mongodb.net/?retryWrites=true&w=majority";

const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = { mongo };