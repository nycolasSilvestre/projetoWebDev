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
    
    // app.post('/login', async (req,res) => {
        
    // });
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
    })
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