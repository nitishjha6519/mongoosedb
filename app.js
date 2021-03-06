const express= require("express");
const bodyParser= require("body-parser");
const mongoose=require("mongoose");
require('dotenv').config();
const db = process.env.db;

try{
mongoose.connect(db);	

console.log("Mongodb is connected");
}catch (err) {
  console.error(err);
  process.exit(1);
}

const signupSchema= new mongoose.Schema({
	name: String,
	email: String,
});

const nameEmail_el=mongoose.model("nameEmail",signupSchema );   //collections called nameEmail


const app= express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
	res.sendFile(__dirname + "/index.html");

});

app.get("/login",  function(req,res){
	res.sendFile(__dirname + "/login.html");

});

const dataPost= async function() {
	 
        await app.post("/", function(req,res){
	console.log(req.body);
	var name1=req.body.name; 
	var email1=req.body.email;
	res.render("index", {name: name1, email: email1});


	const user= new nameEmail_el({
		name: req.body.name,
		email: req.body.email,
	});




	 user.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("user id is saved");
		}
	});

});
}
dataPost();
app.post("/login", function(req,res){
	var name=req.body.name; 
	var email=req.body.email;
	console.log(name);

	nameEmail_el.findOne({name: name}, function (err, founduser){
		if(err){
			console.log(err);
		}
		else{
			res.send("welcome " + name);


		}
	});
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}



app.listen(port, function(){

	console.log("server is running at port 8000");

});
