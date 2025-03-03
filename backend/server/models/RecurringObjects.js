const mongoose = require("mongoose");

const RecurringObjectsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  field: { type: String },
  object_type: { type: String },
  significance: { type: String },
});

module.exports = mongoose.model("RecurringObjects", RecurringObjectsSchema);