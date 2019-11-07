var express = require('express');

var connection = require("./db/connection");

var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");

// Initialize the app and create a port
var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MOUNTING ROUTES
require("./routes/apiRoutes")(app);
app.use(apiRoutes);
app.use(htmlRoutes);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
