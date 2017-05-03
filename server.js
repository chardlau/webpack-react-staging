var express = require('express');
var app = express();

app.use('/', require('connect-history-api-fallback')());
app.use('/', express.static('public'));

var server = app.listen(2000, function() {
  var port = server.address().port;
  console.log('Open http://localhost:%s', port);
});
