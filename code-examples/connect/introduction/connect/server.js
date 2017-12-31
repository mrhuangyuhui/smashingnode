var connect = require('connect')
var path = require('path')
var serveStatic = require('serve-static')

var server = connect()

server.use(serveStatic(path.join(__dirname, 'website')))

server.listen(3000)