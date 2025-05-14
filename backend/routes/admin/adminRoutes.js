const express = require('express');
const router = express.Router();
const ToolSubmission =  require('../../models/ToolSubmission');

router.get('/test', (req, res) => {
  res.send('Admin route working');
});

// GET all submitted tools — for admin
router.get("/tools", async (req, res) => {
  try {
    const tools = await ToolSubmission.find();
    const count = tools.length;
    res.status(200).json({ count, tools });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tools" });
  }
});

// UPDATE status — accept/reject a tool
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
      return res.status(404).json({ error: "Tool not found" });
    }

    res.status(200).json(updatedTool);
  } catch (error) {
    res.status(500).json({ error: "Failed to update tool status" });
  }
});



module.exports = router;