const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require('express').Router();
const User = require('../db').import('../models/user');
const validateSession = require("../middleware/validate-session");


// router.get('/', function (req, res){
//     res.send("Get all users")
// })

//CREATE A USER - user/create
router.post('/create', function (req, res) {
    User.create({
        email:req.body.email,
        username:req.body.username,
        password:bcrypt.hashSync(req.body.password, 11),
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        role: "User"
    })
    .then(
      function successfulCreation(user) {
          let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
          
          res.status(200).json({
              user:user,
              message: "User created successfully",
              sessionToken: token
          })
      }        
  )
  .catch(err => res.status(500).json({err: err.message || serverErrorMsg
  }))
});


//USER LOGIN - user/login
router.post("/login", function (req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(function loginSuccess(user) {
        if (user) {
          bcrypt.compare(req.body.password, user.password, function (
            err,
            matches
          ) {
            if (matches) {
              let token = jwt.sign(
                { id: user.id, email: user.email },
                "test",
                {
                  expiresIn: 60 * 60 * 24,
                }
              );
              res.status(200).json({
                user: user,
                message: "User Successfully Logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login Failed" });
            }
          });
        } else {
          res.status(500).json({ error: "User does not exist" });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  });


module.exports = router;