const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var express = require('express');
var router = express.Router();

router.get('/',async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    const bcurrency=req.query.bcurrency;
    const query = `
query {
    ethereum(network: ethereum) {
      address(address: {is: "0xae78736cd615f374d3085123a210448e74fc6393"}) {
        balances {
          currency {
            address
            symbol
            tokenType
          }
          value
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
    .then(data => res.send( data.data.ethereum.address["balances"] ) )
   
    .catch(console.error);
    
})
module.exports = router;