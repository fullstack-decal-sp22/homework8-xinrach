const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db.js");
const userRoute = require("./routes/user.js");
const shopRoute = require("./routes/shop.js")


// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.use("/user", userRoute);

app.use("/shop", shopRoute);

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });
  
  
  app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  });
  