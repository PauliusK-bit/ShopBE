const express = require("express");
const path = require("path");
const process = require("process");
require("dotenv").config();
require("./db");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const userAPIRoutes = require("./api/userRoutes");
const categoriesAPIRoutes = require("./api/categoryRoutes");
const itemsAPIRoutes = require("./api/itemRoutes");
// const orderAPIRoutes = require("./api/orderRoutes");

app.use("/api/users", userAPIRoutes);
app.use("/api/categories", categoriesAPIRoutes);
app.use("/api/items", itemsAPIRoutes);
// app.use("/api/order", orderAPIRoutes);

app.use(express.static("public"));

app.locals.siteTitle = "My Website";
app.locals.currentDate = new Date().getFullYear();

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
