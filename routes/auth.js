var express = require("express");
var router = express.Router();
const config = require('config');
const { csrf_verify } = require("../utils/config");
/* GET show login page */
router.get('/', function (req, res, next) {
    res.render('login');
});

/* GET show login page */
router.get(config.routes.auth.login_create, function (req, res, next) {
    res.render('login');
});

/* POST show login page */
router.post(config.routes.auth.login_post, csrf_verify,function (req, res, next) {
  res.send("post login user");
});

/* GET show register page */
router.get(config.routes.auth.register_create, function (req, res, next) {
  // res.json(req.session.count);return;
    res.render('register',{error: req.flash('error')});
});

/* POST show register page */
router.post(config.routes.auth.register_post,csrf_verify, function (req, res, next) {
  const {username,password,repeat_password} = req.body;
  if(username.length && password.length>7 && password ==repeat_password){
    req.session.user = req.body;
    res.json({data: req.body,count: req.session.user})
  }else{
    if(username.length==0){
      req.flash('error', 'username is required');
    }else if(password.length<7){
      req.flash('error','password is required');
    }else{
      req.flash('error','repeat_password is required');
    }
    res.redirect(config.routes.auth.root+config.routes.auth.register_create)
  }

});

module.exports = router;
