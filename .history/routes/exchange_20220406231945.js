var express = require('express');
var router = express.Router();
// var ccxt = require ('ccxt')
// const chalk = require('chalk');
// let huobipro  = new ccxt.binance ()
/* GET users listing. */
router.get('/',async function(req, res, next) {
//  const currency=req.query.currency;
 
//  console.log(huobipro);
//  const exchangeId = 'binance', exchangeClass = ccxt[exchangeId]
// const exchangeId = 'un'
// const exeth= await huobipro.fetchTrades (currency);
// const market =await huobipro.fetchMarkets()
// const curr=await huobipro.fetchCurrencies()
// console.log(curr);
res.header("Access-Control-Allow-Origin", "*");
res.send("Ghayas");
});

module.exports = router;
