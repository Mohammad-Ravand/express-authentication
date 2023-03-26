var tokens = require('csrf')()

const config = require('config');
const obj = {};

obj.config =  (req,res,next)=>{
    res.locals.config = config;
    next();
}

obj.csrf_create =(req,res,next)=>{
    try {
        const token = tokens.create(config.csrf.secret)
        res.locals._csrf = token;
        next();
    } catch (error) {
        console.log(error);
    }
}

obj.csrf_verify =  (req,res,next)=>{
    try {
        if (!tokens.verify(config.csrf.secret, req.body._csrf)) {
            throw new Error('invalid token!')
        }
        next();
    } catch (error) {
        console.log(error)
        res.redirect('back');
    }
}

module.exports = obj;