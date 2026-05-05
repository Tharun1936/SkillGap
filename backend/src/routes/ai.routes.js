const express = require('express');
const router = express.Router();
const generateInterviewReport = require('../services/ai.service');

// POST /api/ai/report
router.post('/report', async (req, res) => {
    const { resume, selfDescription, jobDescription } = req.body;
    const result = await generateInterviewReport({ resume, selfDescription, jobDescription });
    if (!result.success) {
        return res.status(500).json({ message: 'AI generation failed', error: result.error });
    }
    return res.status(200).json({ report: result.data });
});

module.exports = router;
