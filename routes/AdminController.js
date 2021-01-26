const { authenticateToken } = require("../Auth/authentication");
const { autheticateAdmin } = require("../Auth/authentication");
const adminViews = require('../public/adminViews')
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

    app.get("/lists/studios", async (req,res)=>{
        let stl = await adminViews.getStudioList()
        res.status(200).send(stl)
    })

    app.get("/lists/actors", async (req,res)=>{
        let stl = await adminViews.getActorsList()
        res.status(200).send(stl)
    })

    app.get("/lists/directors", async (req,res)=>{
        let stl = await adminViews.getDirectorsList()
        res.status(200).send(stl)
    })

    app.get("/lists/producers", async (req,res)=>{
        let stl = await adminViews.getProducersList()
        res.status(200).send(stl)
    })
};