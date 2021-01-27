const db = require('../sequelize')
const User = db.User
const Claim = db.Claim
const bcrypt = require('bcrypt')
const passport = require('passport');
const jwt = require("jsonwebtoken");
const jwtsec = process.env.JWT_SEC
const jwtRefSec = process.env.JWT_SEC_refresh
const { authenticateToken } = require("../Auth/authentication");
const claims = require('../models/claims');
const { QueryTypes } = require('sequelize');

module.exports = (app) => {
    app.post('/register', async (req,res) => {
        try {
            const user = await getUserByEmail(req.body.signUpEmail)
            if (user != null){
                console.log(user)
                throw new Error('Usuário já existente.')
            }
            const hashedPass = await bcrypt.hash(req.body.signUpPassword,10)
            let newUser = await User.create({
                first_name: req.body.signUpName,
                last_name: req.body.signUpLastname,
                email: req.body.signUpEmail,
                password: hashedPass
            })
            await addClaims(newUser.id,[2])
            res.redirect('/index.html')
        } catch (error) {
            console.log(error)
            res.status(400).send(JSON.stringify(error,null,2))
        }
    });
    

    app.post("/login", passport.authenticate('local'), async function(req,res){
        try{
            const user = await getUserByEmail(req.body.username)
            const userCLaims = await getUserClaims(user.id)
            const token = jwt.sign({id:req.body.username,claims:userCLaims},jwtsec,{expiresIn: 3600})
            res.status(200).send({
                auth: true,
                token: token
        });
        }
        catch(e){
            res.sendStatus(500)
        }
    });
    
    app.post("/logout",(req,res)=>{
        res.status(200).send({
            auth: false
        })
    });

    app.get("/getaccountinfo",authenticateToken, async (req,res) =>{
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const user = await getUserByEmail(tokenInfo.id)
        const isAdmin = tokenInfo.claims.includes('Admin')
        res.status(200).send(JSON.stringify({userid: user.id,email: user.email,firstName:user.first_name,lastName:user.last_name,isAdmin:isAdmin}))
    });

    app.post("/favorite/:movieid",authenticateToken, async (req,res) =>{
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const newmovie = await db.Movie.findByPk(req.params.movieid)
        const user = await User.findOne({include: db.Movie},{where:{email:tokenInfo.id}})
        let movies = user.movies
        movies.push(newmovie)
        user.setMovies(movies)
        res.sendStatus(200)
    });

    app.delete("/favorite/:movieid",authenticateToken, async (req,res) =>{
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const oldmovie = await db.Movie.findByPk(req.params.movieid)
        const user = await User.findOne({include: db.Movie},{where:{email:tokenInfo.id}})
        let movies = user.movies
        movies.pop(oldmovie)
        user.setMovies(movies)
        res.sendStatus(200)
    });

    app.post("/favorite/actor/:actorId",authenticateToken, async (req,res) =>{
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const newactor = await db.Actor.findByPk(req.params.actorId)
        const user = await User.findOne({include: db.Actor},{where:{email:tokenInfo.id}})
        let actors = user.actors
        actors.push(newactor)
        user.setActors(actors)
        res.sendStatus(200)
    });

    app.delete("/favorite/actor/:actorId",authenticateToken, async (req,res) =>{
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const oldactor = await db.Actor.findByPk(req.params.actorId)
        const user = await User.findOne({include: db.Actor},{where:{email:tokenInfo.id}})
        let actors = user.actors
        actors.pop(oldactor)
        user.setActors(actors)
        res.sendStatus(200)
    });


    app.post("/favorite/director/:directorId",authenticateToken, async (req,res) =>{
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const newdirector = await db.Director.findByPk(req.params.directorId)
        const user = await User.findOne({include: db.Director},{where:{email:tokenInfo.id}})
        let directors = user.directors
        directors.push(newdirector)
        user.setDirectors(directors)
        res.sendStatus(200)
    });

    app.delete("/favorite/director/:directorID",authenticateToken, async (req,res) =>{
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const oldadirector = await db.Actor.findByPk(req.params.directorId)
        const user = await User.findOne({include: db.Director},{where:{email:tokenInfo.id}})
        let directors = user.directors
        directors.pop(oldadirector)
        user.setDirectors(directors)
        res.sendStatus(200)
    });


    app.post("/favorite/producer/:prodId",authenticateToken, async (req,res) =>{
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const newProducer = await db.Producer.findByPk(req.params.prodId)
        const user = await User.findOne({include: db.Producer},{where:{email:tokenInfo.id}})
        let producers = user.producers
        producers.push(newProducer)
        user.setProducers(producers)
        res.sendStatus(200)
    });

    app.delete("/favorite/producer/:prodId",authenticateToken, async (req,res) =>{
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const oldProducer = await db.Actor.findByPk(req.params.prodId)
        const user = await User.findOne({include: db.Producer},{where:{email:tokenInfo.id}})
        let producers = user.producers
        producers.pop(oldProducer)
        user.setProducers(producers)
        res.sendStatus(200)
    });


    app.get("/favoriteactors", async (req, res, next) => {
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const user = await User.findOne({include: db.Producer},{where:{email:tokenInfo.id}})
        const records = await db.sequelize.query(`select * 
        from "UserFavoriteActors" ufa 
        inner join actors a on ufa."actorId" = a.id 
        where ufa."userId"  = ${user.id}`,
        {type: QueryTypes.SELECT})
        res.status(200).send(JSON.stringify(records,null, 2))
        });
    
    app.get("/favoritedirectors", async (req, res, next) => {
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const user = await User.findOne({include: db.Producer},{where:{email:tokenInfo.id}})
        const records = await db.sequelize.query(`select * 
        from "UserFavoriteDirectors" ufd 
        inner join directors d2 on ufd."directorId" =d2.id 
        where ufd."userId"  = ${user.id}`,
        {type: QueryTypes.SELECT})
        res.status(200).send(JSON.stringify(records,null, 2))
        });
    
    

    app.get("/favoriteproducers", async (req, res, next) => {
        const heders = req.headers ? req.headers['authorization'] : null;
        const auth = heders.split(' ')
        const token = auth[1]
        const tokenInfo = jwt.verify(token,process.env.JWT_SEC)
        const user = await User.findOne({include: db.Producer},{where:{email:tokenInfo.id}})
        const records = await db.sequelize.query(`select * 
        from "UserFavoriteProducers" ufp 
        inner join producers p2 on ufp."producerId" = p2.id 
        where ufp."userId"  = ${user.id}`,
        {type: QueryTypes.SELECT})
        res.status(200).send(JSON.stringify(records,null, 2))
        });
    
};




async function getUserById(id){
    try{
        user = await User.findByPk(id)
        return user
    }
    catch(e){}
}

async function getUserByEmail(userEmail){
    try{
        user = await User.findOne({where:{email:userEmail}},{include: Claim})
        return user
    }
    catch(e){}
}

async function addClaims(userId,claims){
    let user = await User.findByPk(userId)
    await user.setClaims(claims)
}

async function getUserClaims(userId){
    const user = await User.findByPk(userId,{include: Claim})
    let claims =[]
    user.claims.forEach(claim => {
        claims.push(claim.claim_name)
    });
    return claims
}

module.exports.getUserByEmail = getUserByEmail;
module.exports.getUserById = getUserById;