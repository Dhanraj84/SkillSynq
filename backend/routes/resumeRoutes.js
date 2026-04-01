const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/analyzeController');

const router = express.Router();

// Setup Multer for handling file uploads (PDF & Images)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Define the analyze endpoint
router.post('/analyze', upload.single('resume'), analyzeResume);

module.exports = router;
