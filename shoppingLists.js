const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");
const shoppingLists = require("./fakeDb");

router.get("/", (req, res) => {
    res.json({shoppingLists})
});

router.post("/", (req, res) => {
    const newItem = {name: req.body.name, price: req.body.price};
    shoppingLists.push(newItem);
    res.status(201).json({ shoppingList: newItem });
});

router.get("/:name", (req, res) => {
    const foundItem = shoppingLists.find(item => item.name === req.params.name);
    if(foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    res.json({ shoppingList: foundItem })
});

router.patch("/:name", (req, res) => {
    const foundItem = shoppingLists.find(item => item.name === req.params.name);
    if ( foundItem === undefined ) {
        throw new ExpressError("Item not found", 404);
    }
    foundItem.name = req.body.name;
    res.json({ shoppingList: foundItem});
});

router.delete("/:name", (req, res) => {
    const foundItem = shoppingLists.find(item => item.name === req.params.name);
    if (foundItem === -1 ) {
        throw new ExpressError("Item not found", 404)
    }
    shoppingLists.splice(foundItem, 1);
    res.json({ message: "Deleted" })    
});

module.exports = router;