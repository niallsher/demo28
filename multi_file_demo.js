var http = require('http');
var port = process.env.PORT || 3000;
var fs = require('fs');
	
http.createServer(function (req, res) 
{
	file = 'form.html';
	  fs.readFile(file, function(err, txt) {
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.write("This is the home page<br>");
	  res.write(txt);
	  res.end();
	  });

}).listen(port);