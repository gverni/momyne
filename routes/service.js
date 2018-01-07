
/* REST API input parameters
 host: hosts[i].name in config.json
 service: host[i].service[i].name in config.json
*/

var express = require('express')
var ping = require('ping')
const request = require('request')

var router = express.Router()

/* Function that returns the first object whose <idKey> === <idValue>
  arrayOfObject: array of Objects
  idKey: object key that holds the id
  idValue: value of the id
*/
function findObject (arrayOfObjects, idKey, idValue) {
  let returnObject
  arrayOfObjects.forEach(function (object) {
    if (object.hasOwnProperty(idKey)) {
      if (object[idKey] === idValue) { returnObject = object }
    }
  })
  return returnObject
}

var pingPromise = (host) => {
  return new Promise((resolve, reject) => {
    ping.sys.probe(host, function (isAlive) {
      // resolve(host.name + ': ' + (isAlive ? 'Alive' : 'Not reachable'))
      resolve(isAlive)
    })
  })
}

router.get('/', function (req, res, next) {
  var config = req.app.get('config')
  if (req.query.host && req.query.service) {
    let host = findObject(config.hosts, 'name', req.query.host)
    if (host) {
      let service = findObject(host.services, 'name', req.query.service)
      if (service) {
        if (service.protocol === 'ping') {
          console.log('Pinging ' + host.address)
          pingPromise(host.address).then((isAlive) => {
            res.send({status: 'success', isAlive: isAlive})
          }).catch((reason) => {
            res.send({status: 'error', details: 'Error on ping: ' + reason})
          })
        } else if (service.protocol.startsWith('http')) {
          console.log('HHTP(s)ing ' + host.address)
          var options = {
            url: service.protocol + '://' + host.address + ':' + service.port + '/' + service.path,
            timeout: 5000 }
          request(options, function (error, response, body) {
            if (error) {
              res.send({status: 'error', details: error})
            } else {
              res.send({status: 'success', statusCode: response.statusCode})
            }
          })
        } else {
          res.send({status: 'error', details: 'No protocol specified'})
        }
      } else {
        res.send({status: 'error', details: 'service name not found'})
      }
    } else {
      res.send({status: 'error', details: 'host name not found'})
    }
  } else {
    res.send({status: 'error'})
  }
})

module.exports = router
