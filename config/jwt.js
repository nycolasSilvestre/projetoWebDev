const jwt = require('jsonwebtoken')
function authenticateToken(req,res,next){
    const heders = req.headers ? req.headers['authorization'] : null;
    const auth = heders.split(' ')
    const token = auth[1]
    console.log(token)
    if (token==null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SEC,(err,user) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
};

module.exports.authenticateToken = authenticateToken;

