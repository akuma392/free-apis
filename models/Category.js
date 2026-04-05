const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  API: { type: String, required: true },
  Description: String,
  Auth: String,
  HTTPS: Boolean,
  Cors: String,
  Link: String,
  Category: String
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema, "category");
