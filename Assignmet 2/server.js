var express = require('express');
var app = express();

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "pug");

//this line is required for including the router. You only need to change the require()'s specified path.
app.use("/", require("./routes/index"));

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server up and running on port ${PORT}`);
});
