const express = require("express");
const router = express.Router();
const car = require("../models/car");
//home Cars
router.get("/", (req, res) => {
  res.render("Car/home");
});
router.get("/aboutAs", (req, res) => {
  res.render("Car/aboutAs");
});

// buy page
router.get("/buy", (req, res) => {
  car.find({}, (err, cars) => {
    // res.json(cars);
    let chunk = [];
    let size = 3;
    for (let i = 0; i < cars.length; i += size) {
      chunk.push(cars.slice(i, size + i));
    }

    res.render("Car/index", {
      chunk: chunk,
    });
  });
});

//shpw single car
router.get("/show/:id", (req, res) => {
  car.findOne({ _id: req.params.id }, (err, car) => {
    if (!err) {
      res.render("car/show", {
        car: car,
      });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
