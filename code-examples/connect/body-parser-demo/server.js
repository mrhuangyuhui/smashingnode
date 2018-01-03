var connect = require('connect')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var multer  = require('multer')
var fs = require('fs')
var path = require('path')

var server = connect()

server.use(bodyParser.urlencoded({ extended: false }))
server.use(multer({dest: '/tmp/'}).single('name'))
server.use(serveStatic(path.join(__dirname, 'static')))

server.use(function (req, res, next) {
      if ('POST' == req.method && req.body.file) {
        fs.readFile(req.body.file.path, 'utf8', function (err, data) {
          if (err) {
            res.writeHead(500);
            res.end('Error!');
            return;
          }

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end([
              '<h3>File: ' + req.body.file.name + '</h3>'
            , '<h4>Type: ' + req.body.file.type + '</h4>'
            , '<h4>Contents:</h4><pre>' + data + '</pre>'
          ].join(''));
        });
      } else {
        next();
      }
    })

server.listen(3000)
