import fetch from "node-fetch";
var express = require('express');
var router = express.Router();


var sname = "FEGex";


const query = `
query {
  ethereum(network:ethereum ) {
    dexTrades(
      options: {desc: "count", limit:9, offset:0}
      date: {since:"2021-11-02" , till: "2021-12-01T23:59:59"}
      exchangeName: {is: "${sname.toString()}" }
    ) {
      sellCurrency {
        symbol
        address
      }
      sellAmount
      buyCurrency {
        symbol
        address
      }
      buyAmount
      count
      median_price: price(calculate: median)
      last_price: maximum(of: block, get: price)
      dates: count(uniq: dates)
      started: minimum(of: date)
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

router.get('/',async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    fetch(url, opts)
    //.then(res => res.json())
    .then(res => res.text())
    .then(text => res.send(text))
    //.then(console.log(res))
    .catch(console.error);
    
})
module.exports = router;