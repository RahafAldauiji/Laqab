const { request } = require("express");
const express = require("express");
const app = express();
// database connection
const db = require("./config/database");
var bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("node_modules"));

app.use(
  session({
    secret: "lorem ipsum",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 },
  })
);
app.use(flash());
// bring passport
app.use(passport.initialize());
app.use(passport.session());
//store user object

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/cars");
});

const cars = require("./routes/car-routes");
app.use("/cars", cars);

const users = require("./routes/user-routes");
app.use("/users", users);

const admin = require("./routes/admin-routes");
app.use("/admin", admin);

app.listen(3000, () => {
  console.log("app working");
});
