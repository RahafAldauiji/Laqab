const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },

  user_id: {
    type: String,
    required: false,
  },
  created_at: {
    type: String,
  },
});

let Car = mongoose.model("Car", carSchema, "cars");

module.exports = Car;
