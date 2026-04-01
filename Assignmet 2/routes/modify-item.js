var express = require('express');
const router = express.Router()

const mongoose = require('mongoose');
const Menu = require('../models/Menu');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/modify/:name", async function (req, res) {
   if (req.params.name === "new") {
      res.status(200).render("modify-item");
   } else {
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
   }
});

function setFields(item, req) {
   item.name = req.body.name;
   item.description = req.body.description;
   item.imagePredefined = req.body.imagePredefined;
   item.imageUrl = req.body.imageURL;
   item.size = req.body.size;
   item.crust = req.body.crust;

   const TOPPING_KEYWORD = "topping";
   var toppings = [];
   for (key in req.body) {
      if (key.substring(0,TOPPING_KEYWORD.length) === TOPPING_KEYWORD) {
         toppings.push(key.substring(TOPPING_KEYWORD.length).toLowerCase());
      }
   }
   item.toppings =  toppings
}

router.post("/modify", async function (req, res) {
   try {
      var item = await Menu.findOne({ name: req.params.name});
      if (item === null) item = new Menu()
      console.log(item);
      setFields(item,req);
      item.save()
      //TODO: should probably redirect instead
      res.status(200).render("modify-item");
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
});


module.exports = router
