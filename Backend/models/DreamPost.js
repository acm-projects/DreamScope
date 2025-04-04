const mongoose = require("mongoose");

const DreamPost = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   title: { type: String, required: true },
   type: { type: String, enum: ["Detailed", "Fragmented"], required: true },
   dreamText: { type: String }, 
   dreamFragments: [{ type: String }],
   analysis: {type: String},
   //Optional user selections
   themes: [{ type: String }], 
   settings: [{ type: String }],
   emotions: [{ type: String }],
   date: { type: Date, default: Date.now },
   visualizations: [{type: String}],
});

module.exports = mongoose.model("DreamPost", DreamPost);
