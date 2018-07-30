var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 3000;

require("./htmlRoutes")(app);

// app.use(express.static(path.join(__dirname, "public")));

app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT)
});