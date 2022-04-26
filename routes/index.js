var express = require('express');
// var indexRouter = require('./index');
var usersRouter = require('./controllers/users');
var BalanceRouter = require('./controllers/balances');
var exchangeRouter = require('./controllers/exchange');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 router.get('/exchange', exchangeRouter.exchange) 
 router.get('/balances', exchangeRouter.balances) 
 router.get('/users', exchangeRouter.users) 
// module.exports = function (app){
//   app.use('/users', usersRouter);
// app.use('/balances', BalanceRouter);
// app.use('/exchange', exchangeRouter);
// };
module.exports=router;