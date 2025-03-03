const mongoose = require("mongoose");

const PersonalDiarySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event_title: { type: String, required: true },
  journal: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PersonalDiary", PersonalDiarySchema);
