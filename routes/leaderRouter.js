const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Leaders = require('../models/leader');
const cors = require('./cors');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
.options(cors.corsWithOptions,(req,res) => { res.sendStatus(200);})
.get(cors.cors, (req,res,next)=>{
    Leaders.find({})
    .then((Leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leaders);

    },(err) => next(err))
    .catch((err) => next(err)); 
})

.post(cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
    Leaders.create(req.body)
    .then((Leaders) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leaders);
    },(err) => next(err))
    .catch((err) => next(err)); 
})

.put(cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported on /leader');
})

.delete(cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
   Leaders.remove({})
   .then((resp) =>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
   },(err) => next(err))
   .catch((err) => next(err)); 

});

/****************** :leaderId ************************ */

leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions,(req,res) => { res.sendStatus(200);})
.get(cors.cors,(req, res, next)=>{
    Leaders.findById(req.params.leaderId)
    .then((Leaders) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leaders);
    },(err) => next(err))
    .catch((err) => next(err)); 
})

.post(cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})

.put( cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId , {
        $set: req.body
    }, {new: true})
    .then((Leaders) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leaders);
    },(err) => next(err))
    .catch((err) => next(err)); 
})
.delete(cors.corsWithOptions, authenticate.verifyUser,(req, res, next)=>{
    Leaders.findOneAndDelete(req.params.leaderId)
    .then((Leaders) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leaders);
    },(err) => next(err))
    .catch((err) => next(err)); 
});


module.exports = leaderRouter;