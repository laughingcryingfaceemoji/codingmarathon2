require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require("morgan");
const jobRouter = require('./routes/jobRouter');
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

connectDB();

// Using jobRouter for job routes (no auth, no users in this service)
app.use('/api/jobs', jobRouter);

// Simple health check endpoint for Render
app.get('/', (_req, res) => {
  // Health response to satisfy platform HTTP checks
  res.status(200).send('OK');
});


app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
