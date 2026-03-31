var express = require('express');
var app = express();

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "pug");

app.use("/", require("./routes/index"));


const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server up and running on port ${PORT}`);
});
