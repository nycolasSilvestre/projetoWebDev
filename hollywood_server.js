const express = require("express");
require('dotenv/config')
const db = require("./sequelize")
const passConfig = require('./config/passport-config')
const LocalStrategy = require('passport-local').Strategy
const app = express();
const User = require('./routes/UserController')

const passport = require('passport')
passport.use(new LocalStrategy(passConfig.authenticate))
passport.serializeUser((user,done) => done(null,user.id))
passport.deserializeUser((id,done) => done(null,User.getUserById(id)))
const flash = require('express-flash')
const Cors = require('cors');
const bodyParser = require('body-parser');
const UserController = require("./routes/UserController");

// passportInit(passport)


app.listen(3000,() => console.log('Listen port 3000! '));

app.use(express.static('public'));
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(flash())

require('./routes/ActorController')(app);
require('./routes/UserController')(app);
require('./routes/DirectorController')(app);
require('./routes/ProducerController')(app);
require('./routes/StudioController')(app);
require('./routes/MovieController')(app);
require('./routes/AdminController')(app);


// db.sync()