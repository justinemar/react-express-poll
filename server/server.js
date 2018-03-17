const express = require("express");
const router = require("../routes/routes");
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const publicDir = path.resolve(__dirname, '../public');
const server = express();





server.listen(8080);
server.use(express.static(publicDir));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieSession({
    name: 'session',
    keys: [process.env.KEY1, process.env.KEY2],
    httpOnly: false
}));
server.use('/', router);


// server.use((req, res, next) => {
//     if(req.session.id){
//         console.log(req.session.id);
//     }
//     next();
// });

// server.get('*', function(req, res, next) {
//   var err = new Error();
//   err.status = 404;
//   next(err);
// });

// server.use(function(err, req, res, next) {
//   if(err.status !== 404) {
//     return next();
//   }
 
//   res.status(404);
//   res.send(err.message || "This is not how it's supposed to happen" );
// });

