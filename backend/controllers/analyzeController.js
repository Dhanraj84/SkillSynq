const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file uploaded.' });
        }

        const jobDescription = req.body.jobDescription;
        if (!jobDescription) {
            return res.status(400).json({ error: 'Job description is required.' });
        }

        // Prepare form data to send to Python AI Service
        const formData = new FormData();
        formData.append('resume', fs.createReadStream(req.file.path));
        formData.append('jobDescription', jobDescription);

        // Call the Python AI Microservice (assuming it runs on port 8000)
        const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000/api/analyze';
        
        const response = await axios.post(pythonServiceUrl, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        // Clean up the uploaded file from Node.js server after sending to Python
        fs.unlinkSync(req.file.path);

        // Return the AI Results to React Frontend
        return res.status(200).json(response.data);

    } catch (error) {
        console.error('Error in analyzeController:', error.message);
        // Clean up file if error occurs
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ error: 'Failed to analyze resume. Make sure Python AI service is running.' });
    }
};

module.exports = {
    analyzeResume
};
