const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");


router.get("/", function (req, res) {
  res.json({ items });
});

router.post("/", function (req, res, next) {
  try {
    if (!req.body.name) throw new ExpressError("Name is required", 400);
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ item: newItem });
  } catch (e) {
    return next(e);
  }
});

router.get("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  res.json({ item: foundItem });
});

router.patch("/:name", function (req, res) {
  const foundItem = items.find((cat) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  res.json({ item: foundItem });
});


router.delete("/:name", function (req, res) {
  const foundItem = items.findIndex(item => item.name === req.params.name);
  if (foundItem === -1) {
    throw new ExpressError("item not found", 404);
  }
  items.splice(foundItem, 1);
  res.json({ message: "Deleted" });
});


module.exports = router;