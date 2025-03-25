import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
  text: String,
  summary: String,
  type: String,
  sourceUrl: String,
  language: String,
  createdAt : {type: Date, default:Date.now}

});

export default mongoose.models.Summary || mongoose.model("Summary", SummarySchema);