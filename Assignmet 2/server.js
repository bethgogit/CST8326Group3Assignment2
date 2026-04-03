require('dotenv').config();
var express = require('express');
const mongoose = require('mongoose');

var app = express();

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "pug");

//this line is required for including the router. You only need to change the require()'s specified path.
app.use("/", require("./routes/index"));
app.use("/", require("./routes/order"));

// Connect to MongoDB Atlas, then start the server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Database connected');

    const PORT = 3000;
    app.listen(PORT,() => {
        console.log(`Server up and running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Couldn't connect to database:", err.message);
});

