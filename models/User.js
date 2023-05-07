const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  profilePicture: {
    data: Buffer,
    contentType: String,
  },
});

UserSchema.statics.isUsernameTaken = async function isUsernameTaken(username) {
  return this.exists({ username })
    .collation({ locale: "en", strength: 2 })
    .exec();
};

UserSchema.virtual("pfpUrl").get(function getImageUrl() {
  if (!this.profilePicture.data) return "";

  return `data:${
    this.profilePicture.contentType
  };base64,${this.profilePicture.data.toString("base64")}`;
});

module.exports = mongoose.model("User", UserSchema);
