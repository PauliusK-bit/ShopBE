const express = require("express");
const path = require("path");
const process = require("process");
require("dotenv").config();
require("./db");

const bodyParser = require("body-parser");
const cors = require("cors");

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET || "testing",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const userAPIRoutes = require("./api/userRoutes");
const authRoutes = require("./api/oAuth");

app.use("/api/users", userAPIRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static("public"));

app.locals.siteTitle = "My Website";
app.locals.currentDate = new Date().getFullYear();

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
