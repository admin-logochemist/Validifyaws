const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var express = require('express');
var router = express.Router();

router.get('/',async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    const bcurrency=req.query.bcurrency;
    const query = `
query {
    ethereum(network: ethereum) {
      dexTrades(
        date: {in: "2021-04-07"}
        exchangeName: {is: "Uniswap"}
        baseCurrency: {is: "${bcurrency}"}
        quoteCurrency: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}
      ) {
        baseCurrency {
          symbol
          address
        }
        baseAmount
        quoteCurrency {
          symbol
          address
        }
        quoteAmount
        trades: count
        quotePrice
        side
        maker {
          address
        }
      }
    }
  }
  

`;
const url = "https://graphql.bitquery.io/";
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
    //.then(res => res.json())

    .then(res => res.text())
    .then(text => res.send(text))
    .then(console.log(res[]baseCurrency))
    .catch(console.error);
    
})
module.exports = router;