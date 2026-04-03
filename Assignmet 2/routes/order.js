const express = require("express");
const router = express.Router();
const db = require("../db"); 


router.get("/order", (req, res) => {
    res.render("order"); 
});

router.post("/order", (req, res) => {
    const { customerName, pizzaSize, toppings, instructions } = req.body;

    const toppingsList = Array.isArray(toppings)
        ? toppings.join(", ")
        : "";

    const sql = `
        INSERT INTO orders (customerName, pizzaSize, toppings, instructions)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [customerName, pizzaSize, toppingsList, instructions], (err, result) => {
        if (err) {
            console.error("Error inserting order:", err);
            return res.status(500).send("Error saving order");
        }

        res.render("orderSuccess", { name: customerName });
    });
});

module.exports = router;