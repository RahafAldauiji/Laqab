const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const car = require("../models/car");
const { render } = require("express/lib/response");
//const multer = require("multer")
// configure multer
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/images')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + '.png')
//     }
//   })

//   var upload = multer({ storage: storage })
// middleware to check if user is loogged in

isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/users/login");
};
//  login user view
router.get("/login", (req, res) => {
  res.render("user/login", {
    error: req.flash("error"),
  });
});

// login post request
router.post(
  "/login",
  passport.authenticate("local.login", { failureRedirect: "/users/login" }),
  function (req, res) {
    // successful auth, user is set at req.user.  redirect as necessary.
    if (req.user.email == "admin") {
      return res.redirect("/admin");
    }
    res.redirect("/users/profile");
  }
);

// sign up form
router.get("/signup", (req, res) => {
  res.render("user/signup", {
    error: req.flash("error"),
  });
});

// sign up post request

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/signup",
    failureFlash: true,
  })
);
// profile
router.get("/profile", isAuthenticated, (req, res) => {
  //res.json(req.user._id);
  car.find({ user_id: req.user._id }, (err, cars) => {
    console.log(cars);
    let chunk = [];
    let size = 3;
    for (let i = 0; i < cars.length; i += size) {
      chunk.push(cars.slice(i, size + i));
    }
    res.render("user/profile", {
      chunk: chunk,
      success: req.flash("success"),
    });
  });
});

// logout user

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// buy car
router.post("/update", (req, res) => {
  let updateQuery = { _id: req.body.id };
  console.log("updateQuery" + req.body.type);
  let newfeilds = {
    user_id: req.body.userId,
  };
  car.updateOne(updateQuery, newfeilds, (err) => {
    if (!err) {
      req.flash("info", " The car added successfuly");
      res.locals.user = req.user || null;
      //res.json("ok--");
    } else console.log(err);
  });
  res.redirect("/users/profile");
});

module.exports = router;
