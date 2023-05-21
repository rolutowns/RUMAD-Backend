const express = require("express");
const port = 3000;
const app = express();
const RandomUser = require("randomuser");
const rando = new RandomUser();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require('./models/user');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt');

const registerObj = ['firstName', 'lastName', 'email', 'password', 'age','minAge', 'maxAge', 'profilePicture', 'topArtists', 'topSongs']

const initializePassport = require('./passport-config');
initializePassport(
	passport,
	email => users.find(user => user.email === email),
	id => users.find(user => user.id === id)	
);

app.listen(port, () => console.log(`Listening on port ${port}...`));
const uri = "mongodb+srv://admin:password12345@s22incubator-team11.6dfhw.mongodb.net/RUMAD?retryWrites=true&w=majority";

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) console.log(err)
        else console.log("Mongoose is connected")
      }
    );

  } catch (e) {
    console.log("could not connect");
  }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash())
app.use(session({
	secret: 'abc123',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

let user = {};

app.get('/', (req, res) => {
	res.send("Hello World")
})

app.get("/users", async (req, res) => {
  try{
	  const userList = await User.find();
    // should
    console.log("return: "+userList);
	  res.json(userList);
  }
	catch(err){
		res.status(500).json({message: err.message})
	}
	
});

app.get("/login", (req, res)=>{
	res.send("Login")
})
app.get("/register", (req, res)=>{
	res.send("Register")
})

app.post("/match", (req, res) =>{
  	const likedUserID = req.body.likedUserID;
	const likingUserID = req.body.likingUserID;
})

app.post("/login", passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}))

app.post("/register", async (req, res) => {
  	console.log("reached /register endpoint")
	const hashedPassword = await bcrypt.hash(req.body.password, 10) 
	const user = new User({
		firstName: req.body.firstName,		
		lastName: req.body.lastName,		
		email: req.body.email,
		password: hashedPassword,
		age: req.body.age,		
		minAge: req.body.minAge,
		maxAge: req.body.maxAge,
		profilePicture: req.body.profilePicture,
		topArtists: req.body.topArtists,
		topSongs: req.body.topSongs
	});


	try{
		await new User(user).save();
		console.log("saved user to db");
    	res.sendStatus(201);
	} catch(err){
	    console.log(err)
	  	res.sendStatus(400)
  }
});


module.exports = app;