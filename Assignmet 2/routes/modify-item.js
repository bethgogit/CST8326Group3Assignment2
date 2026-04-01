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

router.get("/modify/:id", async function (req, res) {
   try {
      const item = await Menu.findById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'Item not found' });
      res.status(200).json({ success: true, data: item });
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
   //TODO: redirect to an appropriate page
   res.redirect("/modify");
});

router.post("/modify", async function (req, res) {
   //TODO: Missing server side validation
   const TOPPING_KEYWORD = "topping";
   var toppings = [];
   for (key in req.body) {
      if (key.substring(0,TOPPING_KEYWORD.length) === TOPPING_KEYWORD) {
         toppings.push(key.substring(TOPPING_KEYWORD.length).toLowerCase());
      }
   }

   const item = new Menu({
      name: req.body.name,
    description: req.body.description,
    imagePredefined: req.body.imagePredefined,
    imageUrl: req.body.imageURL,
    size: req.body.size,
    crust: req.body.crust,
    toppings: toppings
   });
   await item.save()
   //TODO: redirect to an appropriate page
   res.redirect("/modify");
});


module.exports = router
