const {
  isToday,
  isYesterday,
  format,
  isThisYear,
  formatDistanceToNowStrict,
} = require("date-fns");
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

MessageSchema.virtual("formattedDate").get(function getFormattedDate() {
  const date = this.createdAt;
  if (isToday(date) || isYesterday(date)) {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }

  // if is this year, omit year, else show year
  return format(date, `MMM d${isThisYear(date) ? "" : ", yyyy"}`);
});

MessageSchema.virtual("url").get(function getUrl() {
  return `/message/${this.id}`;
});

module.exports = mongoose.model("Message", MessageSchema);
