var express = require('express');
const router = express.Router()

const mongoose = require('mongoose');
const Menu = require('../models/Menu');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/modify/:name", async function (req, res) {
   try {
      console.log("loading item with name "+req.params.name)
      const item = await Menu.findOne({ name: req.params.name});
      if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
      console.log(item);
      //I don't understand why I can't pass the item directly.
      res.status(200).render("modify-item",{
            name: item.name,
            description: item.description,
            imagePredefined: item.imagePredefined,
            imageUrl: item.imageUrl,
            size: item.size,
            crust: item.crust,
            toppings: item.toppings,
      });
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
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
