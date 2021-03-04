const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://admin-Shobhit:buggatti@cluster0.vypaw.mongodb.net/portfolioDB",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const contactSchema = {
	firstName: String,
	lastName: String,
	email: String,
	subject: String,
	message: String
};
const Contact = mongoose.model("Contact", contactSchema);

app.get("/", function(req,res){
	res.render("about");
});

app.get("/about", function(req,res){
	res.render("about");
});

app.get("/resume", function(req,res){
	res.render("resume");
});

app.get("/projects", function(req,res){
	res.render("projects");
});

app.get("/contact", function(req,res){
	res.render("contact");
});

app.post("/contact", function(req,res){
	const contact = new Contact({
		firstName: req.body.firstname,
		lastName: req.body.lastname,
		email: req.body.emailid,
		subject: req.body.subject,
		message: req.body.message
	});
	contact.save(function(err){
		if(!err)
			res.redirect("/");
		else
			console.log(err);
	});
});

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});