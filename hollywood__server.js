const express = require("express");
const db = require("./sequelize")
const app = express();
app.listen(3000,() => console.log('Listen port 3000'));
app.use(express.static('public'));
db.sinc();
