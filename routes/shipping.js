var express = require('express');
var router = express.Router();

const shipping = require("../business/shipping");

router.get('/', function(req, res, next) {
  shipping.offerShippingOptions((response) => {
    console.log(response);
    res.send(response);
  });
});

module.exports = router;
