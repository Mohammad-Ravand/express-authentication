const obj = {};
const Joi = require("joi");

obj.get_login = (req,res,next) => {
  const config = res.locals.config;
  if(!req.session.user){
    next()
  }else{
    res.redirect(config.routes.home)
  }
};

obj.post_login_validation = async (req,res,next) => {
  try {
    const schema = Joi.object().keys({
      _csrf: Joi.string().required(),
      username: Joi.string().alphanum().min(5).max(30).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const value = await schema.validateAsync(req.body);
    req.value = value;
    next();
  } catch (error) {
    req.session.validateData = req.body;
    const config = res.locals.config;
    req.flash("error", error.details[0].message);
    res.redirect(config.routes.auth.root + config.routes.auth.login_create);
  }
};

obj.get_register = (req,res,next) => {
  const config = res.locals.config;
  if(!req.session.user){
    next()
  }else{
    res.redirect(config.routes.home)
  }
};

obj.post_register_validation = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      _csrf: Joi.string().required(),
      username: Joi.string().alphanum().min(5).max(30).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      repeat_password: Joi.ref("password"),
    });
    const value = await schema.validateAsync(req.body);
    req.value = value;
    next();
  } catch (error) {
    req.session.validateData = req.body;
    const config = res.locals.config;
    req.flash("error", error.details[0].message);

    res.redirect(config.routes.auth.root + config.routes.auth.register_create);
  }
};

obj.logged_in_validation = async (req, res,next) => {
  const config = res.locals.config;
  if(!req.session.user){
    res.redirect(config.routes.auth.root + config.routes.auth.login_create)
  }else{
    next()
  }
  
};

module.exports = obj;
