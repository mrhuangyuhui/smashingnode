var connect = require('connect')
var morgan = require('morgan')
var serveStatic = require('serve-static')
var path = require('path')

var server = connect()

server.use(morgan('dev'))
server.use(morgan('type is :res[content-type], length is '
  + ':res[content-length] and it took :response-time ms.'))
server.use(serveStatic(path.join(__dirname, 'website')))

server.listen(3000)