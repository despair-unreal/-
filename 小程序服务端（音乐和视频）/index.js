var express = require('express')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')
var multiparty = require('multiparty')
var util = require('util')

var LOCAL_BIND_PORT = 3000
var app = express()

app.post('/upload', function(req, res) {
  var form = new multiparty.Form()
  form.encoding = 'utf-8'
  form.uploadDir = './htdocs/upfile'
  form.maxFilesSize = 4 * 1024 * 1024
  form.parse(req, function(err, fields, files) {
    if(err) {
      console.log('parse error: ' + err)
    } else {
      console.log('parse files: ' + JSON.stringify(files))
    }
    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'})
    res.write('received upload')
    res.end()
  })
})

var serve = serveStatic('./htdocs')
app.use('/', serveIndex('./htdocs', {'icons': true}))

app.get('/*', function(req, res) {
    serve(req, res)
});

console.log(`Start static file server at ::${LOCAL_BIND_PORT}, Press ^ + C to exit`)
app.listen(LOCAL_BIND_PORT)
