var express = require('express');
const router = express.Router()

//example middleware function for a router.
router.get("/modify", function (req, res) {
   res.render("modify-item");
});

module.exports = router
