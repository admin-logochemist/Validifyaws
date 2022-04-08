const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var express = require('express');
var router = express.Router();


var sname = "FEGex";




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