const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const validator = require("validator");
const publicDir = path.resolve(__dirname, '../public');
const viewsDir = path.resolve(__dirname, '../views');
require('dotenv').config()


const dbURL =  process.env.DB_URL;
let db;
const server = express();
server.listen(8080);
server.use(express.static(publicDir))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.set(viewsDir);
server.set('view engine', 'ejs');


MongoClient.connect(dbURL, (err, client) => {
    if(err) throw err;
    db = client.db('test-authentication');
})

server.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
})


server.post('/api/register', validateMiddle, (req, res) => {
    db.collection('users').findOne({
        email: req.body.email
    }, (err, succ) => {
        if(err) throw err;
        
        if(succ){
            res.json({
                message: 'Email already exists!'
            })
        } else {
            db.collection('users').save(req.body, (err, succ) => {
                if(err){
                    throw err;
                } else {
                    res.json({
                        message: 'You may now log in!'
                    })
                }
            })
        }
    })
})



function validateMiddle(req, res, next){
    if(validator.isEmail(req.body.email)){
        next();
    } else {
        res.json({
            message: 'Email is invalid!'
        })
    }
}

server.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

server.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }
 
  res.status(404);
  res.send(err.message || "This is not how it's supposed to happen" );
});