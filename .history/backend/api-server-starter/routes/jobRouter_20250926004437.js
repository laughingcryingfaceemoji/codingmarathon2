const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Public endpoints
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

// Protected endpoints (add auth middleware if needed)
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
