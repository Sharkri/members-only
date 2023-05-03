const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
