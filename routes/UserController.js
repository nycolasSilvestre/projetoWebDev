const db = require('../sequelize')
const User = db.User
const bcrypt = require('bcrypt')
const passport = require('passport');
const jwt = require("jsonwebtoken");
const jwtsec = process.env.JWT_SEC
const { authenticateToken } = require("../config/jwt");

module.exports = (app) => {
    app.post('/register', async (req,res) => {
        try {
            const user = await getUserByEmail(req.body.signUpEmail)
            if (user != null){
                console.log(user)
                throw new Error('Usuário já existente.')
            }
            const hashedPass = await bcrypt.hash(req.body.signUpPassword,10)
            await User.create({
                first_name: req.body.signUpName,
                last_name: req.body.signUpLastname,
                email: req.body.signUpEmail,
                password: hashedPass
            })
            res.redirect('/index.html')
        } catch (error) {
            console.log(error)
            res.status(400).send(JSON.stringify(error,null,2))
        }
    });
    
    // app.post('/login', async (req,res) => {
        
    // });
    app.post("/login", passport.authenticate('local'),
    function(req,res){
        const token = jwt.sign({id:req.body.username,claims:['admin']},jwtsec,{expiresIn: 3600})
        res.status(200).send({
            auth: true,
            token: token
        });
    });
    
    app.post("/logout",(req,res)=>{
        res.status(200).send({
            auth: false
        })
    });

    app.get("/getuser/:email",authenticateToken, async (req,res) =>{
        const user = await getUserByEmail(req.params.email)
        res.status(200).send(JSON.stringify({userid: user.id,email: user.email,firstName:user.first_name,lastName:user.last_name}))
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
        user = await User.findOne({where:{email:userEmail}})
        return user
    }
    catch(e){}
}

module.exports.getUserByEmail = getUserByEmail;
module.exports.getUserById = getUserById;