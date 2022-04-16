const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var express = require('express');
var router = express.Router();

router.get('/',async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    const bcurrency=req.query.bcurrency;
    const network=req.query.network;
    const qcurrency=req.query.qcurrency;
    const ex=req.query.ex;
    const query = `
query {
  ethereum(network: ${network}) {
    dexTrades(
      date: {in: "2021-04-15"}
      exchangeName: {is: "${ex}"}
      baseCurrency: {is: "${bcurrency}"}
      quoteCurrency: {is: "${qcurrency}"}
    ) {
      baseCurrency {
        symbol
        address
        name
      }
      baseAmount
      quoteCurrency {
        symbol
        address
        name
      }
      quoteAmount
      maximum_price: quotePrice(calculate: maximum)
      trades: count
      quotePrice
      side
      maker {
        address
      }
      block {
        timestamp {
          iso8601
        }
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
   

    .then(res => res.json())
    .then(data => res.send( data.data.ethereum.dexTrades ) )
   
    .catch(console.error);
    
})
module.exports = router;