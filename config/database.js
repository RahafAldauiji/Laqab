const mongoose = require("mongoose");

let db = mongoose.connect(
  "mongodb://localhost:27017/Laqab",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to db succcesfuly...");
    }
  }
);
