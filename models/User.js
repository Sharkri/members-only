const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: {
      collation: { locale: "en", strength: 2 },
    },
  },
  displayName: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    index: {
      collation: { locale: "en", strength: 2 },
    },
  },
  password: { type: String, required: true },
  membershipStatus: {
    type: String,
    enum: ["member", "admin", "none"],
    default: "none",
  },
});

module.exports = mongoose.model("User", UserSchema);
