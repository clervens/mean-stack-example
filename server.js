var http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(process.env.PORT||3030);

console.log('Server start at http://localhost:' + (process.env.PORT||3030))