let express = require("express");

let app = express();
let handlebars = require("express-handlebars").create({defaultLayout:"main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);

let visitors = 0;
let PRIZE_VISITOR = 20;

app.get("/", function(req, res) {

	// define context to send to handlebars
	let context = {};

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