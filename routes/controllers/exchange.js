const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var express = require('express');
var router = express.Router();

exports.exchange= (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const bcurrency=req.query.bcurrency;
    const network=req.query.network;
    const qcurrency=req.query.qcurrency;
    const ex=req.query.ex
    const query = `
query
{
  ethereum(network: ${network}) {
    dexTrades(
      options: {desc: ["block.height", "tradeIndex"], limit: 10000, offset: 0}
      date: {since: "2022-01-15"}
      baseCurrency: {is: "${bcurrency}"}
      quoteCurrency: {is: "${qcurrency}"}
    ) {
      block {
        timestamp {
          time(format: "%Y-%m-%d %H:%M:%S")
        }
        height
      }
      baseCurrency {
        symbol
        address
      }
      quoteCurrency {
        symbol
        address
      }
      side
      baseAmount
      quoteAmount
      quotePrice
      tradeIndex
      transaction(txHash: {}) {
        txFrom {
          address
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
    
}
// module.exports = router;
