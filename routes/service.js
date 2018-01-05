
var express = require('express')
var ping = require('ping')
const request = require('request')

var router = express.Router()

var pingPromise = (host) => {
  return new Promise((resolve, reject) => {
    ping.sys.probe(host, function (isAlive) {
      // resolve(host.name + ': ' + (isAlive ? 'Alive' : 'Not reachable'))
      resolve(isAlive)
    })
  })
}

router.get('/', function (req, res, next) {
  if (req.query.protocol === 'ping') {
    pingPromise(req.query.address).then((isAlive) => {
      res.send({status: 'success', isAlive: isAlive})
    }).catch((reason) => {
      res.send({status: 'error', details: 'Error on ping: ' + reason})
    })
  } else if (req.query.protocol.startsWith('http')) {
    var options = {
      url: req.query.protocol + '://' + req.query.address + ':' + req.query.port + '/' + req.query.path,
      timeout: 5000 }
    request(options, function (error, response, body) {
      if (error) {
        res.send({status: 'error', details: error.code})
      } else {
        res.send({status: 'success', statusCode: response.statusCode})
      }
    })
  } else {
    res.send({status: 'error', details: 'No protocol specified'})
  }
})

module.exports = router
