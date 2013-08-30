var fs = require('fs');
var content = fs.readFileSync("index.html").toString();
var express = require('express');
var http = require('http');
var db = require('./models');
var app = express();
app.use(express.logger());
app.set('port', process.env.PORT || 8080);

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
    addEmail(user_email,function(err){
	if(err){console.log(err);
		response.send("error subscribing");}
	else{response.redirect("/");
	     }
	});
});
app.get('/*.png',function(request,response){
    var f=getFileName(request);
    response.sendfile(f);
});

// sync the database and start the server
db.sequelize.sync().complete(function(err) {
  if (err) {
    throw err;
  } else {
    http.createServer(app).listen(app.get('port'), function() {
      console.log("Listening on " + app.get('port'));
    });
  }
});

// add email to the database if it doesn't already exist
var addEmail = function(userEmail, callback) {
    var Email = global.db.Email;
    // find if email has already been added to our database
   Email.find({where: {user_email: userEmail}}).success(function(email_instance) {
      if (email_instance) {
        // email already exists, do nothing
        callback();
      } else {
        // build instance and save
          var new_email_instance = Email.build({
          user_email:userEmail
        });
          new_email_instance.save().success(function() {
          callback();
        }).error(function(err) {
          callback(err);
        });
      }
    });
  
};
