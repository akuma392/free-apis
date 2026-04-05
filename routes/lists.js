var express = require("express");
var router = express.Router();
var List = require("../models/List");

router.get("/", async (req, res, next) => {
    try {
        let list = await List.find({});
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
});

module.exports = router;