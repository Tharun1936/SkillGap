const generateInterviewReport = require("../services/ai.service");

async function generateInterviewReportController(req, res) {
    try {
        const { resume, selfDescription, jobDescription } = req.body;

        if (!resume || !selfDescription || !jobDescription) {
            return res.status(400).json({
                message: "resume, selfDescription and jobDescription are required"
            });
        }

        const report = await generateInterviewReport({
            resume,
            selfDescription,
            jobDescription
        });

        return res.status(200).json({
            message: "Interview report generated successfully",
            data: report
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to generate interview report"
        });
    }
}

module.exports = {
    generateInterviewReportController
};
