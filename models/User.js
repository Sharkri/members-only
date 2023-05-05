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
    maxlength: 25,
  },
  password: { type: String, required: true, minlength: 6 },
  membershipStatus: {
    type: String,
    enum: ["member", "admin", "none"],
    default: "none",
  },
});

UserSchema.statics.isUsernameTaken = async (username) =>
  this.exists({ username }).collation({ locale: "en", strength: 2 }).exec();

module.exports = mongoose.model("User", UserSchema);
