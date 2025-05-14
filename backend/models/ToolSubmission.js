// import mongoose from "mongoose";
const mongoose = require('mongoose')

const toolSubmitSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // can be a URL or filename (if uploading)
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports =  mongoose.models.ToolSubmission || mongoose.model("ToolSubmission", toolSubmitSchema);