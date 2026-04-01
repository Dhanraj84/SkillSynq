const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

/*
 Ensure uploads folder exists
*/
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  console.log("Uploads folder not found. Creating...");
  fs.mkdirSync(uploadDir, { recursive: true });
}

/*
 Middleware
*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 Serve uploaded files (optional but useful)
*/
app.use("/uploads", express.static(uploadDir));

/*
 Routes
*/
app.use("/api", resumeRoutes);

/*
 Health check
*/
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running.",
  });
});

/*
 Global error handler
*/
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    error: "Internal server error",
  });
});

/*
 Start server
*/
app.listen(PORT, () => {
  console.log(`Node.js Backend Proxy is running on port ${PORT}`);
});