const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const car = require("../models/car");
const { render } = require("express/lib/response");

router.get("/", (req, res) => {
  res.render("admin/home");
});

// create
router.get("/create", (req, res) => {
  res.render("admin/create", {
    errors: req.flash("errors"),
  });
});

router.post("/create", (req, res) => {
  let newCar = new car({
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    created_at: Date.now(),
  });

  newCar.save((err) => {
    if (!err) {
      req.flash("info", " The car was created successfuly");
      res.redirect("/admin/buy");
    } else {
      console.log(err);
    }
  });
});

// show orders
//{ $ne: null }

router.get("/showOrders", (req, res) => {
  car.find({ user_id: { $ne: null } }, (err, cars) => {
    //res.json(cars);
    let chunk = [];
    let size = 3;
    for (let i = 0; i < cars.length; i += size) {
      chunk.push(cars.slice(i, size + i));
    }
    res.render("admin/showOrders", {
      chunk: chunk,
    });
  });
});

router.get("/buy", (req, res) => {
  car.find({ user_id: null }, (err, cars) => {
    // res.json(cars);
    let chunk = [];
    let size = 3;
    for (let i = 0; i < cars.length; i += size) {
      chunk.push(cars.slice(i, size + i));
    }

    res.render("admin/index", {
      chunk: chunk,
    });
  });
});

module.exports = router;
