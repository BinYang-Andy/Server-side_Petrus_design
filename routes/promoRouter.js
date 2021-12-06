const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());


promoRouter.route('/')

.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next) => {
    res.end('Will send all the promotions to you');

})

.post((req,res,next)=>{
    res.end('Will add the promotion: '+ req.body.name + ' with datials '+ req.body.description);

})

.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported on /promotions');
})

.delete((req,res,next)=>{
    res.end('Deleting the promotions');

});


promoRouter.route('/:promotionId')

.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req, res, next)=>{
    res.end('Will send all the promotions of promotion' + req.params.promotionId);
})

.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.promotionId);
})

.put((req,res,next)=>{
    res.write('Updating the promotions '+ req.params.promotionId +'\n');
    res.end('Will update the promotions '+ req.body.name + ' with details '+ req.body.description);
})
.delete((req, res, next)=>{
    res.end('Deleting the promotion '+ req.params.promotionId);
});


module.exports = promoRouter;