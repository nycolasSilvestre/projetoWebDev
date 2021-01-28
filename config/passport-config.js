const localStg = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../routes/UserController')
const CryptoJS = require('crypto-js/core')
CryptoJS.AES = require("crypto-js/aes");

async function authenticate (username,password, done){
    let bytes = CryptoJS.AES.decrypt(password,'WebDevEncrypt')
    descrptpass = bytes.toString(CryptoJS.enc.Utf8)
    console.log(descrptpass)
    const user = await User.getUserByEmail(username)
    if (user == null){
        return done(null,false,{message: 'Usuário não encontrado.'})
    }
    try {
        if (await bcrypt.compare(descrptpass.toString(),user.password)){
            return done(null,user)
        }
        else{
            return done(null,false,{message:'Senha incorreta para o usuário inserido.'})
        }
    } catch (error) {
        console.log(error)
        return done(error)
    }
}


// module.exports = initialize;
module.exports.authenticate = authenticate;