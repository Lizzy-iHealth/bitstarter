var fs = require('fs');
var content = fs.readFileSync("index.html").toString();
var express = require('express');
var app = express();
app.use(express.logger());

var getFileName=function(request){
    var path=__dirname+request.path;
    return path;
};
app.get('/', function(request, response) {
  response.send(content);
});

app.get('/subscribe',function(request,response){
    var user_email=request.query.user_email;
    console.log(user_email);
});
app.get('/*.png',function(request,response){
    var f=getFileName(request);
    response.sendfile(f);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
