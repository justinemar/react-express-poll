const express = require('express');
const router = express.Router();
const path = require("path");
const publicDir = path.resolve(__dirname, '../public');
const validator = require("validator");
const db = require("../connection/mongo").getDB;
const init = require("../connection/mongo");


init.connect(() => {});

function validateMiddle(req, res, next){
    if(validator.isEmail(req.body.email)){
        next();
    } else {
        res.json({
            message: 'Email is invalid!',
            type: 'error-p'
        })
    }
}

function findByEmail(email){
    return new Promise((resolve, reject) => {
        db().collection('polls').find({
            author: email
        }).toArray((err, succ) => {
            if(err) {
              reject(err);
            }
            
            if(succ){
                resolve(succ)
            }
        })
    });
}


router.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
})


router.get('/api/mypolls', (req, res) => {
    if(req.session.id){
        findByEmail(req.session.id.email)
            .then(data => {
                res.json({
                    polls: data
                })
            })
    } else {
        res.json({
            message: 'Not set'
        })
    }
});

router.get('/api/polls', (req, res) => {
    db().collection('polls').find({}).toArray((err, succ) => {
        if(err) throw err;
        

        if(succ){
            res.send(succ)
        }
    });
});

router.post('/api/vote', (req, res) => {
    const user_ip = req.headers['x-forwarded-for'];
    const id = req.body.pollID;
    const vote = req.body.vote;
    const identifier = req.session.id === undefined ? user_ip : req.session.id.email; 
    const userinfo = req.session.id === undefined ? 'Guest User' : req.session.id.email
    db().collection('polls').findOne({
        _id: require("mongodb").ObjectId(id), "voters.identifier": identifier
    }, (err, found) => {
        if(err) throw err;
        
        
        if(found){
            res.json({
                valid: false,
                message: 'You already voted!',
                type: 'error-p'
            })    
        } else {
            db().collection('polls').update(
                   { _id:  require("mongodb").ObjectId(id), "options.key": vote },
                   { $inc: { "options.$.votes" : 1 } , 
                     $push: { "voters" : { "identifier": identifier, "userinfo": userinfo}}
                   }, 
                   { upsert: true, safe: false},
                   function(notfound, data){
                       if(notfound) {
                        db().collection('polls').update(
                          { _id: require("mongodb").ObjectId(id) },
                          { $push : { "options" : {"key": vote, "votes": 1 },
                                      "voters": {"identifier": identifier, "userinfo": userinfo}} 
            
                          });
                            res.json({
                                valid: true,
                                message: 'New option voted and added!',
                                type: 'success-p'
                            });
                        }
                        
                       if(data){
                            res.json({
                                valid: true,
                                message: 'Voted!',
                                type: 'success-p'
                            });
                       }
                   }
            );
        }
    });
});

router.post('/api/register', validateMiddle, (req, res) => {
    db().collection('users').findOne({
        email: req.body.email
    }, (err, succ) => {
        if(err) throw err;
        
        if(succ){
            res.json({
                message: 'Email already exists!',
                type: 'error-p'
            });
        } else {
            db().collection('users').save(req.body, (err, succ) => {
                if(err){
                    throw err;
                } else {
                    res.json({
                        message: 'Success!',
                        type: 'success-p'
                    });
                }
            });
        }
    });
});


router.post('/api/newpoll',  (req, res, next) => {
    if(req.body.title){
        //-//-//-//-//-//-//-//-//-//-//-//-//-//-//
                // FIND USER DATA //
        //-//-//-//-//-//-//-//-//-//-//-//-//-//-//
        const setData = new Promise((resolve, reject) => {
            db().collection('users').findOne({
                _id: require("mongodb").ObjectId(req.session.id._id)
            }, (err, succ) => {
                if(err) {
                    reject(err);
                }
                
                if(succ){
                    resolve(succ);
                }
            });
        });
        
        //-//-//-//-//-//-//-//-//-//-//-//-//-//-//
                // SET POLL DATA //
        //-//-//-//-//-//-//-//-//-//-//-//-//-//-//
        setData
            .then(data => {
              const escapeTitle = validator.escape(req.body.title);
              const escapeOptions = validator.escape(req.body.options.join(","));
              const pollData = {};
                pollData['author'] = data.email;
                pollData['title'] = escapeTitle;
                pollData['options'] = [];
                pollData['voters'] = [];
                escapeOptions.split(',').forEach(i => {
                    pollData['options'].push({key: i, votes: 0});
                });
                return pollData;
            }).then(pollData => {
                db().collection('polls').save(pollData, (err, succ) => {
                    if(err) throw err;
                    
                    if(succ){
                        res.json({
                            message: 'Success: Poll created',
                            type: 'success-p'
                        });
                    }
                });
            }).catch(err => {
                //Throw error for invalid requests
                    res.status(500).json({
                        message: 'Error: Internal Server Error',
                        type: 'error-p'
                    });
            });
            
    } else {
        res.json({
            message: 'Error: Invalid title format',
            type: 'error-p'
        });
    }
});

router.post('/api/logout', (req, res) => {
    if(req.session.id){
        req.session = null;
        res.json({
            unauth: true});
    } else {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/api/login', (req, res) => {
   db().collection('users').findOne({
        email: req.body.email
    }, (err, succ) => {
        if(err) throw err;
        if(succ && succ.email == req.body.email && succ.password == req.body.password){
            delete succ.password;
            req.session.id = succ;
            res.json({
                authed: true
            });
        } else {
            res.json({
                message: 'Invalid Email or Password',
                type: 'error-p'
            });
        }
    });
});

router.post('/api/delete', (req, res) => {
    const email = req.session.id.email
    const targetPoll = req.body.id;
    if(req.session.id){
        db().collection('polls').deleteOne({ 
            _id: require("mongodb").ObjectId(targetPoll) ,
             author: email
        }, (err, succ) => {
            if(err) throw err;
            
            
            if(succ){
                res.json({
                    message: 'Success',
                    type: 'success-p'
                })
            }
        })
    } else {
        res.status(500).json({
            message: 'Internal Server Error',
            type: 'error-p'
        })
    }
});

router.post('/api/checkAuth', (req, res) => {
    if(req.session.id){
        res.json({ valid: true, email: req.session.id.email });
    } else {
        res.json({
            message: 'Not set'
        });
    }
});


module.exports = router;