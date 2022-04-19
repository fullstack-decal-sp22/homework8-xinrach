const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");

router.get("/list", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(user);
        res.status(200).json({
            status: "List retrieved successfully.",
            shoppinglist: user.shoppinglist,
        });
    } catch(e) {
        res.status(500).send({message: "Error in Fetching User."});
    }
});

router.post("/add", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const item = req.body.item;
        if (user.shoppinglist == undefined) {
            user.shoppinglist = [];
        }
        user.shoppinglist.push(item);
        await user.save();
        res.status(200).json({
            status: "Item added successfully.",
            shoppinglist: user.shoppinglist,
        });
    } catch(e) {
        res.status(500).send({message: "Error in adding to shopping list."});
    }
});

router.delete("/delete", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const item = req.body.item;
        const list = user.shoppinglist;
        if (list.includes(item)) {
            const index = list.indexOf(item);
            list.splice(index, 1);
            await user.save();
            res.status(200).json({
                status: "Item removed successfully.",
                shoppinglist: user.shoppinglist,
            })
        }
    } catch(e) {
        res.status(500).send({message: "Error in deleting from shopping list."});
    }
});

module.exports = router;