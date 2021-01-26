const { authenticateToken } = require("../Auth/authentication");
const { autheticateAdmin } = require("../Auth/authentication");
const adminViews = require('../public/Backoffice/adminViews')
// const fs = require('fs')

// const adminPanel = fs.readFileSync('../adminpanel.html')
// const db = require("../sequelize")
// const User = db.User

module.exports = (app) => {
    app.get("/adminpanel", authenticateToken, autheticateAdmin,(req, res, next) => {
        res.status(200).send(adminViews.getMainPanel())
    });

    app.get("/adminpanel/insert/:type", authenticateToken, autheticateAdmin,(req, res, next) => {
        res.status(200).send(adminViews.getAddItem(req.params.type))
    });

    app.get("/adminpanel/edit/:type", authenticateToken, autheticateAdmin,(req, res, next) => {
        res.status(200).send(adminViews.getEditItem(req.params.type))
    });
};