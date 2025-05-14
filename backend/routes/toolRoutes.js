const express = require("express");
const multer = require("multer");
const path = require("path");
const ToolSubmission = require("../models/ToolSubmission");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST - Submit tool with image
router.post("/tools", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !image) {
      return res.status(400).json({ error: "Name and image are required" });
    }

    const newTool = await ToolSubmission.create({ name, image });
    res
      .status(201)
      .json({ message: "Tool submitted successfully", tool: newTool });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload tool" });
  }
});

// GET - Fetch all tools
router.get("/tools", async (req, res) => {
  try {
    const tools = await ToolSubmission.find();
    const count = tools.length; // Count the number of tools
    res.status(200).json({ count, tools });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tools" });
  }
});

// PUT - Update tool status (accepted/rejected)
router.put("/tools/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedTool = await ToolSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTool) {
      return res.status(404).json({
        error: "Tool not Found",
      });
    }
    res
      .status(200)
      .json({ message: `Tool ${status} successfully`, tool: updatedTool });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update tool status",
    });
  }
});

module.exports = router;
