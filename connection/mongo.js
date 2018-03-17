require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const routes = require("../routes/routes");
const dbURL =  process.env.DB_URL;
var db;

module.exports = {
    connect: function(cb){
        MongoClient.connect(dbURL, (err, client) => {
            db = client.db('test-authentication');
            return cb(err)
        })
    },
    
    getDB: function() {
        return db;
    }
}

