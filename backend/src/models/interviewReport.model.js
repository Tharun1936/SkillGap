const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true, message: "Technical question is required" },
    intention: { type: String, required: true, message: "Intention is required" },
    answer: { type: String, required: true, message: "Answer is required" }
}, {
    _id: false
});

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true, message: "Behavioral question is required" },
    intention: { type: String, required: true, message: "Intention is required" },
    answer: { type: String, required: true, message: "Answer is required" }
}, {
    _id: false
});

const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: true, message: "Skill is required" },
    severity: { type: String, required: true, enum: ["low", "medium", "high"], message: "Severity is required" }
}, {
    _id: false
});

const preparationPlanSchema = new mongoose.Schema({
    day: { type: Number, required: true, message: "Day is required" },
    focus: { type: String, required: true, message: "Focus is required" },
    tasks:[{ type: String, required: true, message: "At least one task is required" }]
}, {
    _id: false
});

const interviewReportSchema = new mongoose.Schema({
    jobDescription: { type: String,
         required: true
        },
    resume: { type: String,
         required: true
        },
    selfDescription: { type: String,
         required: true
        },
    matchScore: { type: Number,
         required: true,
         min: 0,
         max: 100,
        },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema]
}, {
    timestamps: true
});

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = InterviewReport;