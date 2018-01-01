var express = require('express')
var router = express.Router()

var ping = require('ping')

var pingPromise = (host) => {
  return new Promise((resolve, reject) => {
    ping.sys.probe(host.address, function (isAlive) {
      resolve(host.name + ': ' + (isAlive ? 'Alive' : 'Not reachable'))
    })
  })
}

router.get('/', function (req, res, next) {
  var config = req.app.get('config')
  var promises = []
  config.hosts.forEach(function (host) {
    promises.push(pingPromise(host))
  })

  Promise.all(promises).then((results) => {
    res.send(results.join('<p>'))
  })
})

module.exports = router
