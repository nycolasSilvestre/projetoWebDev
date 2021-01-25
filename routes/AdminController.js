const { authenticateToken } = require("../config/jwt");
const { autheticateAdmin } = require("../config/jwt");
const adminViews = require('../public/Backoffice/adminViews')
// const fs = require('fs')

// const adminPanel = fs.readFileSync('../adminpanel.html')
// const db = require("../sequelize")
// const User = db.User

module.exports = (app) => {
    app.get("/adminpanel", authenticateToken, autheticateAdmin,(req, res, next) => {
        res.status(200).send(adminViews.adminpanel)
        });
    
};
  