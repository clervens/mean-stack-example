var http = require('http'),
	path	 = require('path');
var express = require('express');
var bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// App Configuration
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));

// App Routes
app.use('/api', require('./app_server/routes/api')());
app.use('/auth', require('./app_server/routes/auth')());

app.use(express.static(path.resolve(__dirname, 'client')));

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: require('./package').name.replace(/-/g, ' ') });
});

var server = http.createServer(app);
server.listen(process.env.PORT || 3030, process.env.IP || "localhost", function(){
  var addr = server.address();
  console.log("Server listening at http://" + addr.address + ":" + addr.port);
});
