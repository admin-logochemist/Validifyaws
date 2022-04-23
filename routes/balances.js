const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var express = require('express');
var router = express.Router();

router.get('/',async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    const query = `
query  {
  ethereum(network: ${network}) {
    dexTrades(
      options: {asc: "timeInterval.minute"}
      date: {since: "2021-06-20T07:23:21.000Z", till: "2021-06-23T15:23:21.000Z"}
      baseCurrency: {is: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"},
      quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"},
      tradeAmountUsd: {gt: 10}
    ) 
    {
      timeInterval {
        minute(count: 15, format: "%Y-%m-%dT%H:%M:%SZ")  
      }
      volume: quoteAmount
      high: quotePrice(calculate: maximum)
      low: quotePrice(calculate: minimum)
      open: minimum(of: block, get: quote_price)
      close: maximum(of: block, get: quote_price) 
    }
  }
}
  

`;
const url = "https://graphql.bitquery.io";
const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "BQY2ggaR0pKjoYRJq3jH7AVCHJRSX5Qy"
    },
    body: JSON.stringify({
        query
    })
};

    fetch(url, opts)
   

    .then(res => res.text())
    .then(text => res.send( text) )
   
    .catch(console.error);
    
})
module.exports = router;