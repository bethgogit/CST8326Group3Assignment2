var express = require('express');
const router = express.Router()

const mongoose = require('mongoose');
const Menu = require('../models/Menu');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/newItem", async function(req, res) {
   res.status(200).render("modify-item");
}) 

router.get("/modify/:name", async function (req, res) {
   try {
         const item = await Menu.findOne({ name: req.params.name});
         if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
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

router.post("/save", async function (req, res) {
   try {
      const item = new Menu(req.body);
      if (await Menu.findOne({name: item.name})) {
         //Not sure if this is the right status code to use for an error due to a duplicate.
         //I found it here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/409
         res.status(409).json({ success: false, message: "This name already exists in database." });
      } else {
         item.save()
         res.status(200).json({ success: true, data: item})
      }
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
});

router.put("/modify", async function (req, res) {
   try {
      const item = await Menu.findOne();
      setFields(item,req);
      item.save()
      res.status(200).json({ success: true, data: item})
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
});

module.exports = router
