var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
		passport = require('passport'),
    morgan = require('morgan');

require('./app_server/models/models.js');
mongoose.connect(process.env.MONGODB_URI);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// App Configuration
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./app_server/passport-init')(passport);

// App Routes
app.use('/api', require('./app_server/routes/api')(passport));
app.use('/auth', require('./app_server/routes/auth')(passport));

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: require('./package').name.replace(/-/g, ' ') });
});

app.use(express.static(path.resolve(__dirname, 'app_client/www')));

var server = http.createServer(app);
server.listen(process.env.PORT || 3030, function(){
  var addr = server.address();
  console.log("Server listening at http://" + (process.env.IP || "0.0.0.0") + ":" + addr.port);
});
