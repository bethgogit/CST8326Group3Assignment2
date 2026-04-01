var express = require('express');
const router = express.Router()

const mongoose = require('mongoose');
const Menu = require('../models/Menu');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/modify", function (req, res) {
   //TODO: add parameter object containing item info
   res.render("modify-item");
});

router.post("/modify", function (req, res) {
   console.log(req.body);
   //TODO: redirect to an appropriate page
   res.redirect("/modify");
});

module.exports = router
