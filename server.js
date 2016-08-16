var http = require('http'),
	path	 = require('path');
var express = require('express');

var app = express();
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'client')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Mean Stack Exemple' });
});

server.listen(process.env.PORT || 3030, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
