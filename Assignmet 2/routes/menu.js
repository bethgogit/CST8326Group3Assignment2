var express = require('express');
const router = express.Router()

const mongoose = require('mongoose');
const Menu = require('../models/Menu');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/menu", async function (req, res) {
    var items;
    try {
        items = await Menu.find({});
        if (!items) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
    res.render("menu",{
        list: items
    });
});

module.exports = router