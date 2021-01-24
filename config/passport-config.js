const localStg = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../routes/UserController')

// function initialize(passport){
//         const authenticate = async (username,password, done) => {
//         const user = await User.getUserByEmail(username)
//         if (user == null){
//             return done(null,false,{message: 'Usuário não encontrado.'})
//         }
//         try {
//             if (await bcrypt.compare(password,user.password)){
//                 return done(null,user)
//             }
//             else{
//                 return done(null,false,{message:'Senha incorreta para o usuário inserido.'})
//             }
//         } catch (error) {
//             console.log(error)
//             return done(error)
//         }
//     }
//     passport.use(new localStg(authenticate))
//     passport.serializeUser((user,done) => done(null,user.id))
//     passport.deserializeUser((id,done) => done(null,User.getUserById(id)))
// }

async function authenticate (username,password, done){
    const user = await User.getUserByEmail(username)
    if (user == null){
        return done(null,false,{message: 'Usuário não encontrado.'})
    }
    try {
        if (await bcrypt.compare(password,user.password)){
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