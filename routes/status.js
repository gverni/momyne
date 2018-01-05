var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  var config = req.app.get('config')
  res.render('status', { hosts: config.hosts })
})

module.exports = router
