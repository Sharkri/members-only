const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    first: { type: String },
    last: { type: String },
  },
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

UserSchema.virtual("fullName").get(function getFullName() {
  return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("User", UserSchema);
