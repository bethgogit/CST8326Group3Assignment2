var express = require('express');
const router = express.Router()

//example middleware function for a router.
router.get("/", function (req, res) {
   res.render("index");
});

module.exports = router
