var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);

var visitors = 0;
var PRIZE_VISITOR = 20;

app.get("/", function(req, res) {

	// define context to send to handlebars
	var context = {};

	// build params and set visitor number
	context.visitor_number = visitors;
	
	// increment visitor counter
	visitors++;

	// if visitor is prize number, send prize flag
	if (visitors >= PRIZE_VISITOR) {
		context.isPrizeVisitor = true;
	}
	
	// render home
	res.render("home", context);
});

// broadcast on port specified above
app.listen(app.get("port"), function() {
	console.log("express started on http://localhost:" + app.get("port"));
});