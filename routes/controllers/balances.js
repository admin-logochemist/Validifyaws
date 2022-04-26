const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var express = require('express');
var router = express.Router();
const server = require('http').createServer(router);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server:server });
wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    
  });
});


router.get('/',async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    const bcurrency=req.query.bcurrency;
    const network=req.query.network;
    const qcurrency=req.query.qcurrency;
    const exchange=req.query.exchange;
    const to=req.query.to;
    const from=req.query.from;
    const interval=req.query.interval;
    const query =
     `
query  {
  ethereum(network: ${network}) {
    dexTrades(
      options: {asc: "timeInterval.minute"}
      exchangeName: {is: "${exchange}"}, 
      date: {since: "${to}", till: "${from}"}
      baseCurrency: {is: "${bcurrency}"}
      quoteCurrency: {is: "${qcurrency}"}
      
    ) 
    {
      timeInterval {
        minute(count: ${interval}, format: "%Y-%m-%dT%H:%M:%SZ")  
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
    .then(text =>   res.send(text) )
   
    .catch(console.error);
    
})

module.exports = router;