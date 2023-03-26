var express = require("express");
var router = express.Router();
const config = require('config');
const { csrf_verify } = require("../utils/config");

const { PrismaClient }= require('@prisma/client');
const { post_register_validation, post_login_validation, get_login, get_register } = require("../validation/post/authValidation");

const prisma = new PrismaClient()


/* GET show login page */
router.get('/',get_login ,function (req, res, next) {
  res.render('login',{success:req.flash('success')});
});

/* GET show login page */
router.get(config.routes.auth.login_create, get_login,function (req, res, next) {
  console.log('login create')
  
  res.render('login',{success:req.flash('success'),error:req.flash('error')});
});

/* POST show login page */
router.post(config.routes.auth.login_post, csrf_verify,post_login_validation,async function (req, res, next) {
  try {
    const {username,password} = req.value;
    //is user exist
    const user = await prisma.user.findFirst({where:{ username: username}});
    if(user==null) {
      req.flash('error','username not found');
      throw new Error('username not found');
    }
    //set user infos in session
    req.session.user = user;

    //redirect to home page
    res.redirect(config.routes.home)

  } catch (error) {
    res.redirect(config.routes.auth.root+config.routes.auth.login_create)

  }
});

/* GET show register page */
router.get(config.routes.auth.register_create,get_register, function (req, res, next) {
  // res.json(req.session.count);return;
  res.render('register',{error: req.flash('error'),user:req.session.validateData});
});

// GET make user logout
router.get(config.routes.auth.logout, function (req, res, next) {
  // res.json(req.session.count);return;
  req.session.user =null;
  res.redirect(config.routes.auth.root+config.routes.auth.login_create)
});


/* POST show register page */
router.post(config.routes.auth.register_post,csrf_verify,post_register_validation,async  function (req, res, next) {
  const {username,password,repeat_password} = req.value;

    //save user data in database
  
      const isUser = await prisma.user.findUnique({where: {username: username}});
      // ... you will write your Prisma Client queries here
      if(isUser==null){
        const user = await prisma.user.create({
          data: {
            username: username,
            password: password
          },
        })
        //flash success message
        req.flash('success','your registration completed successfully');
        //redirect to login page
        res.redirect(config.routes.auth.root+config.routes.auth.login_create)

      }else{
        req.flash('error','username is already exist');
        res.redirect(config.routes.auth.root+config.routes.auth.register_create)
      }
      await prisma.$disconnect()
    

});

module.exports = router;
