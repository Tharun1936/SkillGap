require('dotenv').config();

const generateInterviewReport = require('../src/services/ai.service');

(async () => {
  // Replace these sample strings with real resume / descriptions when you run
  const sample = {
    resume: `Experienced backend engineer with 6 years building scalable Node.js services, MongoDB, Docker, and CI/CD pipelines. Worked on performance tuning, large-scale ETL, and observability.`,
    selfDescription: `I am a pragmatic engineer who focuses on clean APIs, reliable services, and measurable outcomes. I enjoy mentoring and improving team processes.`,
    jobDescription: `Senior Backend Engineer role focused on scalable APIs, data pipelines, MongoDB, distributed systems, and mentoring junior engineers.`
  };

  try {
    const result = await generateInterviewReport(sample);

    if (!result || result.success === false) {
      console.error('AI generation failed:', result?.error || 'unknown error');
      process.exit(1);
    }

    // Pretty-print the report JSON to the terminal
    console.log(JSON.stringify(result.data, null, 2));
  } catch (err) {
    console.error('Unexpected error while generating report:', err);
    process.exit(1);
  }
})();
