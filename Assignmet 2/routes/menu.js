var express = require('express');
const router = express.Router()

const mongoose = require('mongoose');
const Menu = require('../models/Menu');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/menu", async function (req, res) {
    var items;
    try {
        let query = {};
        if (req.query.name.length>0) query.name = req.query.name
        if (req.query.size && req.query.size!="All") query.size = req.query.size
        if (req.query.crust && req.query.crust!="All") query.crust = req.query.crust
        let findToppings = []
        if (req.query.Nothing==="on") {
            //this code sucks but I don't have time to improve it.
            const TOPPINGS = ['Cheese', 'Pepperoni', 'Sausage', 'Peppers', 'Pineapple']
            for (topping of TOPPINGS) {
                if (req.query[topping]==="on") findToppings.push(topping);
            }
            query.toppings = findToppings;
        }
        console.log(query);
        items = await Menu.find(query);
        res.status(200)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
    res.render("menu",{
        list: items
    });
});

module.exports = router