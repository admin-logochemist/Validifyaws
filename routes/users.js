var express = require('express');
var router = express.Router();
var ccxt = require ('ccxt')
let huobipro  = new ccxt.huobipro ()
/* GET users listing. */
router.get('/',async function(req, res, next) {
 const currency=req.query.currency;
 
//  console.log(huobipro);
//  const exchangeId = 'binance', exchangeClass = ccxt[exchangeId]
const exchangeId = 'binance'
const exeth= await huobipro.fetchTrades (currency)

res.header("Access-Control-Allow-Origin", "*");
res.send(exeth);
});

module.exports = router;
