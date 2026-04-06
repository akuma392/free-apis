var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const now = new Date();
  res.json({
    message: "Welcome to Free APIs",
    date: now.toDateString(),
    time: now.toLocaleTimeString()
  });
});

module.exports = router;
