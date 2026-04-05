var express = require("express");
var router = express.Router();
var Category = require("../models/Category");
var List = require("../models/List");

router.get("/", async (req, res, next) => {
  try {
    let searchTerm = req.query.q;
    let auth = req.query.auth;
    let https = req.query.https || req.query.HTTPS;

    // Build filter object
    let filter = {};

    if (searchTerm) {
      filter.API = { $regex: searchTerm, $options: "i" };
    }

    if (auth !== undefined) {
      filter.Auth = auth;
    }

    if (https !== undefined) {
      filter.HTTPS = https === "true" ? true : false;
    }

    let results = await Category.find(filter);
    res.status(200).json({
      filters: {
        searchTerm: searchTerm || null,
        auth: auth || null,
        https: https || null
      },
      count: results.length,
      categories: results
    });
  } catch (error) {
    next(error);
  }
});

router.get("/random", async (req, res, next) => {
  try {
    let categories = await Category.find({});
    res.status(200).json({ Number: Math.floor(Math.random() * categories.length), category: categories[Math.floor(Math.random() * categories.length)] });
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    let slug = req.params.slug;

    // Find the list item by slug
    let listItem = await List.findOne({ slug: { $regex: `^${slug}$`, $options: "i" } });

    if (!listItem) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Use the name from list to search in category
    let categories = await Category.find({ Category: listItem.name });
    res.status(200).json({
      category: listItem.name,
      count: categories.length,
      results: categories
    });
  } catch (error) {
    console.log("Error:", error);
    next(error);
  }
});

module.exports = router;
