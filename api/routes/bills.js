const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();

//! get all Bill
router.get("/get-bill", async (req, res) => {
  try {
    const Bills = await Bill.find();
    res.status(200).json(Bills);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! create
router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;