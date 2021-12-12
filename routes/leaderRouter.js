const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Leader = require('../models/leader');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());


leaderRouter.route('/')

.get((req,res,next)=>{
    Leader.find({})
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);

    },(err) => next(err))
    .catch((err) => next(err)); 
})

.post(authenticate.verifyUser,(req,res,next)=>{
    Leader.create(req.body)
    .then((leader) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err) => next(err)); 
})

.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported on /leader');
})

.delete(authenticate.verifyUser,(req,res,next)=>{
   Leader.remove({})
   .then((resp) =>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
   },(err) => next(err))
   .catch((err) => next(err)); 

});

/****************** :leaderId ************************ */

leaderRouter.route('/:leaderId')

.get((req, res, next)=>{
    Leader.findById(req.params.leaderId)
    .then((leader) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err) => next(err)); 
})

.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})

.put(authenticate.verifyUser,(req,res,next)=>{
    Leader.findByIdAndUpdate(req.params.leaderId , {
        $set: req.body
    }, {new: true})
    .then((leader) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err) => next(err)); 
})
.delete(authenticate.verifyUser,(req, res, next)=>{
    Leader.findOneAndDelete(req.params.leaderId)
    .then((leader) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err) => next(err)); 
});


module.exports = leaderRouter;