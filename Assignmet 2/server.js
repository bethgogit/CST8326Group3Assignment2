var express = require('express');
var app = express();

app.get('/', function(req,res) {
	res.send("hi");
});


const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server up and running on port ${PORT}`);
});
